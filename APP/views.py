from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index.html')


def register(request):
    if request.method == 'GET':
        return render(request, 'register.html')
    elif request.method == 'POST':
        tel = request.POST.get('tel')
        password = request.POST.get('password')
        password_again = request.POST.get('password_again')





def login(request):
    return render(request, 'login.html')


def basket(request):
    return render(request, 'basket.html')

