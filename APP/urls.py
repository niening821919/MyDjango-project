from django.conf.urls import url

from APP import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.login, name='login'),
    url(r'^logout/$', views.logout, name='logout'),
    url(r'^basket/$', views.basket, name='basket'),
    url(r'^list/$', views.list, name='list'),
    url(r'^detail/(\d+)/$', views.detail, name='detail'),

    url(r'^checkuser/$', views.checkuser, name='checkuser'),
    url(r'^addcart/$', views.addcart, name='addcart'),
    url(r'^subcart/$', views.subcart, name='subcart'),
    url(r'^changecartstatus/$', views.changecartstatus, name='changecartstatus'),
    url(r'^changecartselect/$', views.changecartselect, name='changecartselect'),
    url(r'^cartDelete/$', views.cartDelete, name='cartDelete'),
]