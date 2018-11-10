import hashlib
import uuid

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from APP.models import User, Wheel


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
    return render(request, 'basket.html')


def logout(request):
    request.session.flush()

    return redirect('app:index')


def list(request):
    return render(request, 'list.html')


def detail(request):
    return render(request, 'detail.html')


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
