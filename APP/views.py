from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from APP.models import User, Wheel


def index(request):
    wheels = Wheel.objects.all()
    tel = request.COOKIES.get('tel')
    data = {
        'wheels': wheels,
        'tel': tel,
    }

    return render(request, 'index.html', context=data)


def register(request):
    if request.method == 'GET':
        return render(request, 'register.html')
    elif request.method == 'POST':
        tel = request.POST.get('tel')
        password = request.POST.get('password')
        password_again = request.POST.get('password_again')

        user = User()
        user.tel = tel
        user.password = password
        user.password_again = password_again

        user.save()

        response = redirect('app:index')

        response.set_cookie('tel', user.tel)


        return response
    else:
        return HttpResponse('用户名或者密码错误')





def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        tel = request.POST.get('tel')
        password = request.POST.get('password')

        users = User.objects.filter(tel=tel).filter(password=password)

        if users.count():
            user = users.first()

            response = redirect('app:index')

            response.set_cookie('tel', user.tel)

            return response
        else:
            return HttpResponse('账号或者密码错误')


def basket(request):
    return render(request, 'basket.html')


def logout(request):
    response = redirect('app:index')

    response.delete_cookie('tel')


    return response


def list(request):
    return render(request, 'list.html')


def detail(request):
    return render(request, 'detail.html')