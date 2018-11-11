import hashlib
import uuid

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from APP.models import User, Wheel, Goods, Basket


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


        return render(request, 'basket.html',context={'baskets':baskets})
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
            basket.number = basket.number+1
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