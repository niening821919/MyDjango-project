from django.db import models


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=40, unique=True)
    password = models.CharField(max_length=256)
    token = models.CharField(max_length=256)

    class Meta:
        db_table = 'sasa_user'


class Wheel(models.Model):
    img = models.CharField(max_length=100)

    class Meta:
        db_table = 'sasa_wheel'

class Goods(models.Model):
    goodsid = models.IntegerField(default=0)
    smallImg = models.CharField(max_length=256, default='')
    middleImg = models.CharField(max_length=256, default='')
    bigImg = models.CharField(max_length=256, default='')
    maintitle = models.CharField(max_length=100, default='')
    title = models.CharField(max_length=100, default='')
    yew = models.CharField(max_length=100, default='')
    quality = models.CharField(max_length=30, default='')
    result = models.CharField(max_length=30, default='')
    newPrice = models.DecimalField(max_digits=7, decimal_places=2)
    oldPrice = models.CharField(max_length=10, default='')

    class Meta:
        db_table = 'sasa_goods'


class Basket(models.Model):
    # 用户
    user = models.ForeignKey(User)
    # 商品
    goods = models.ForeignKey(Goods)
    # 商品数量(选择)
    number = models.IntegerField()
    # 是否选中
    isselect = models.BooleanField(default=True)

    class Meta:
        db_table = 'sasa_basket'


#订单
# 一个用户 对应 多个订单
# 在从表声明关系
class Order(models.Model):
    # 用户
    user = models.ForeignKey(User)
    # 创建时间
    createtime = models.DateTimeField(auto_now_add=True)
    # 状态
    # -1 过期
    # 1 未付款
    # 3 已发货
    status = models.IntegerField(default=1)
    # 订单号
    identifier = models.CharField(max_length=256)

# 订单商品
# 一个订单 对应 多个商品
# 在从表声明关系
class OrderGoods(models.Model):
    # 订单
    order = models.ForeignKey(Order)
    # 商品
    goods = models.ForeignKey(Goods)
    # 个数
    number = models.IntegerField(default=1)

