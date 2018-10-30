from django.conf.urls import url

from APP import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.login),
    url(r'^basket/$', views.basket),
]