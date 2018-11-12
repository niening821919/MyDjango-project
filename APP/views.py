import hashlib
import random
import time
import uuid

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from APP.models import User, Wheel, Goods, Basket, Order, OrderGoods


def index(request):
    wheels = Wheel.objects.all()
    token = request.session.get('token')
    data = {
        'wheels': wheels,
    }
    if token:
        user = User.objects.get(token=token)
        data['username'] = user.username

    else:
        pass

    return render(request, 'index.html', context=data)


def genarate_password(param):
    sha = hashlib.sha256()
    sha.update(param.encode('utf-8'))
    return sha.hexdigest()


def register(request):
    if request.method == 'GET':
        return render(request, 'register.html')
    elif request.method == 'POST':
        user = User()
        user.username = request.POST.get('username')
        user.password = genarate_password(request.POST.get('password'))
        user.token = str(uuid.uuid5(uuid.uuid4(), 'register'))
        user.save()

        request.session['token'] = user.token

        return redirect('app:index')


def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username)
        print(password)

        try:
            user = User.objects.get(username=username)
            if user.password == genarate_password(password):
                # 更新token
                user.token = str(uuid.uuid5(uuid.uuid4(), 'login'))
                user.save()
                request.session['token'] = user.token
                return redirect('app:index')
            else:
                return render(request, 'login.html', context={'passwordErr': '密码错误!'})
        except:
            return render(request, 'login.html', context={'usernameErr': '账号不存在！'})


def basket(request):
    token = request.session.get('token')
    if token:
        user = User.objects.get(token=token)
        baskets = Basket.objects.filter(user=user).exclude(number=0)

        total = 0
        for cart in baskets:
            if cart.isselect:
                total += cart.number * cart.goods.newPrice

        return render(request, 'basket.html', context={'baskets': baskets, "total": total})
    else:
        return redirect('app:login')


def logout(request):
    request.session.flush()

    return redirect('app:index')


def list(request):
    # 商品
    goods_list = Goods.objects.all()

    return render(request, 'list.html', context={'goods_list': goods_list})


def detail(request, goodsid):
    token = request.session.get('token')
    baskets = []
    goods = Goods.objects.get(goodsid=goodsid)
    if token:
        user = User.objects.get(token=token)
        baskets = Basket.objects.filter(user=user)
    data = {
        'goods': goods,
        'baskets': baskets,

    }

    return render(request, 'detail.html', context=data)


def checkuser(request):
    username = request.GET.get('username')

    responseData = {
        'msg': '账号可以用',
        'status': 1,

    }

    try:
        user = User.objects.get(username=username)
        responseData['msg'] = '账号已被占用'
        responseData['status'] = -1
        return JsonResponse(responseData)
    except:
        return JsonResponse(responseData)


def addcart(request):
    goodsid = request.GET.get('goodsid')
    token = request.session.get('token')

    responseData = {
        'msg': '添加购物车成功',
        'status': 1,
    }

    if token:
        # 获取用户
        user = User.objects.get(token=token)
        # 获取商品
        goods = Goods.objects.get(pk=goodsid)

        # 商品存在就改数量 不存在就加入一条新数据
        baskets = Basket.objects.filter(user=user).filter(goods=goods)
        if baskets.exists():
            basket = baskets.first()
            basket.number = basket.number + 1
            basket.save()
            responseData['number'] = basket.number
        else:
            basket = Basket()
            basket.user = user
            basket.goods = goods
            basket.number = 1
            basket.save()

            responseData['number'] = basket.number

        return JsonResponse(responseData)
    else:
        responseData['msg'] = '未登录，请登陆后操作'
        responseData['status'] = -1
        return JsonResponse(responseData)


def subcart(request):
    # 获取数据
    token = request.session.get('token')
    goodsid = request.GET.get('goodsid')

    # 对应的用户 和 商品
    user = User.objects.get(token=token)
    goods = Goods.objects.get(pk=goodsid)

    # 删减操作
    basket = Basket.objects.filter(user=user).filter(goods=goods).first()
    basket.number = basket.number - 1
    basket.save()

    responseData = {
        'msg': '购物车减操作',
        'status': 1,
        'number': basket.number,
    }

    return JsonResponse(responseData)


def changecartstatus(request):
    basketid = request.GET.get('basketid')
    basket = Basket.objects.get(pk=basketid)
    basket.isselect = not basket.isselect
    basket.save()

    carts = Basket.objects.filter(user=User.objects.get(token=request.session.get("token")), isselect=True)
    total = 0
    for cart in carts:
        total += cart.number * cart.goods.newPrice

    responseData = {
        'msg': "选中状态改变",
        'status': 1,
        'isselect': basket.isselect,
        "total": total,
    }
    return JsonResponse(responseData)


def changecartselect(request):
    token = request.session.get('token')
    user = User.objects.get(token=token)
    baskets = Basket.objects.filter(user=user)
    isselect = request.GET.get('isselect')
    total = 0
    if isselect == 'true':
        isselect = True
    else:
        isselect = False

    for basket in baskets:
        if isselect:
            basket.isselect = 1
            basket.save()
            total += basket.number * basket.goods.newPrice

        else:
            basket.isselect = 0
            basket.save()

    return JsonResponse({'msg': '全选成功',"total":total})


def generateorder(request):
    token = request.session.get('token')
    user = User.objects.get(token=token)
    # 生成订单
    order = Order()
    order.user = user
    order.identifier = str(int(time.time())) + str(random.randrange(10000, 100000))
    order.save()

    # 订单商品
    baskets = Basket.objects.filter(user=user).filter(isselect=True)
    for basket in baskets:
        orderGoods = OrderGoods()
        orderGoods.order = order
        orderGoods.goods = basket.goods
        orderGoods.number = basket.number
        orderGoods.save()

        responseData = {
            'msg': '订单生成成功',
            'status': 1,
            'identifier': order.identifier,
        }

        # 从购物车移除
        basket.delete()

    return JsonResponse(responseData)


def orderinfo(request, identifier):
    # 一个订单 对应 多个商品
    order = Order.objects.get(identifier=identifier)


    return render(request, 'orderinfo.html', context={'order': order})