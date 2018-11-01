from django.conf.urls import url

from APP import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.login, name='login'),
    url(r'^logout/$', views.logout, name='logout'),
    url(r'^basket/$', views.basket, name='basket'),
    url(r'^list/$', views.list, name='list'),
    url(r'^detail/$', views.detail, name='detail'),
]