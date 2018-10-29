

$(function (){
	
//	console.log(location.search);
	var str=location.search;
	str=str.substring(str.indexOf('?')+1);
	var arr1=str.split('=');
	var id=parseInt(arr1[1]);
	$.ajax({
		type:"get",
		url:"json/detail.json",
		async:true,
		success:function(data){
			
			getData(data);
			
		}
	});
	
	function getData(data){
		var length=$('.product-album_list li').length;
		
		for(var i=0;i<length;i++){
			$('.product-album_list li').eq(i).children('img').attr('src',data[id].smallImg[i])
			
		}
		$('#middleImg').attr('src',data[id].middleImg[0]);
		$('#bigImg').attr('src',data[id].bigImg[0]);
		$('.title').html(data[id].title);
		$('.quality').html(data[id].quality);
		$('.price').html(data[id].newPrice);
		$('.old-price em').html(data[id].oldPrice);
		
	}
	

	
	
	
	
	//图片放大
	
	//放大镜移动
	$('.product-album-preview').on({
		
		'mousemove':
					function (e){
						$('#area').show();
						$('#big_box').show();
						var disx=e.pageX-$(this).offset().left-$('#area').width()/2;
						//console.log(left);
						var disy=e.pageY-$(this).offset().top-$('#area').height()/2;
						if(disx<=0){
							disx=0;
						}
						
						if(disx>=($(this).width()-$('#area').width())){
							disx=$(this).width()-$('#area').width();
						}
						if(disy<=0){
							disy=0;
						}
						if(disy>=($(this).height()-$('#area').height())){
							disy=$(this).height()-$('#area').height();
						}
						
						$('#area').show().css({left:disx,top:disy});
					
						var scale=$('#bigImg').width()/$(this).width();
						
						$('#bigImg').css({left:-disx*scale,top:-disy*scale});
						
						
						
					},
					
		'mouseleave':function (){
					$('#area').hide();
					$('#big_box').hide();
			
		}
	})
	
	//移入小图
	$('.product-album_list li').on({
		
		'mouseenter':function (){
//					console.log($(this).index())
					$(this).addClass('bd_active').siblings().removeClass('bd_active');
					var str=$(this).children('img').attr('src');
					$('#middleImg').attr('src','images/list'+(id+1)+'_2_'+($(this).index()+1)+'.jpg');
					$('#bigImg').attr('src','images/list'+(id+1)+'_2_'+($(this).index()+1)+'.jpg');
			
		}
	})
	
	//左右切换
	$('#prve').click(function (){
		console.log();
		if($('.product-album_list').css('left')!='0px'){
			$('.product-album_list').css('left',0);
		}
		
		
	})
	
	$('#next').click(function (){
		if($('.product-album_list').css('left')!='-75px'){
			$('.product-album_list').css('left','-75px');
		}
		
		
	})
	
	//商品倒计时
	countTime();
	function countTime(){
		var start=new Date();
		var end=new Date();
		end.setTime(start.getTime()+24*3600*1000);
		
		var target=end.getTime();
		var timer=setInterval(function (){
			var d=new Date();
			
			i=target-d.getTime();
	//		console.log(i);
			
			$('#day').html(parseInt(i/(1000*36000*24)));
			$('#hours').html(add(parseInt((i/(1000*3600)%24))));
			$('#minutes').html(add(parseInt((i/(1000*60)%60))));
			$('#seconds').html(add(parseInt((i/1000)%60)));
			
		},1000)
		function add(num){
			
			if(num<=9){
				return '0'+num;
			}
			
			return num;
		}
	
	}

	//加入购物车
	
//	function (){
//		
//		
//	}


	//取出数据
	
	var arr=[];
	refresh();
	function refresh(){
		arr=$.cookie('myCart')==undefined?[]:JSON.parse($.cookie('myCart'));
			//购物车商品数量
		numCart();
		//总计商品数量
		function numCart(){
			var num=0;
			for(var i=0;i<arr.length;i++){
				num+=arr[i].num;
			}
			$('.js_cartnum').html(num);
		
		}
		//同时刷新顶部购物车
		topCart();
//		
	}
	
	//点击加入购物车
	
	$('#add_cart').click(function (){
		var obj={};
		var flag=true;
		obj.img=$('.product-album_list li').eq(0).children('img').attr('src');
		obj.title=$('.product-titles2 .title').html();
		obj.quality=$('.quality').html();
		obj.price=$('.price').html();
		obj.num=parseInt($('.shop_num').val());
		obj.id=id;
//		
//		for(i=0;i<arr.length;i++){
//			if(arr[i].id==obj.id){
//				flag=false;
//				arr[i].num+=obj.num;
//			}
//		}
//		if(flag){
//			arr.push(obj);
//			
//		}
//		
		console.log(obj.num)
		var arr=$.cookie('myCart')==undefined?[]:JSON.parse($.cookie('myCart'));
		var flag=true;
		for(var i=0;i<arr.length;i++){
			if(arr[i].id==obj.id){
			
				flag=false;
				arr[i].num+=obj.num;
			}
	
		}
		if(flag){
			obj.num=obj.num;
			obj.checked=false;
			arr.push(obj);
			
		}
		
			
		$.cookie('myCart',JSON.stringify(arr),{expires:30,path:'/'});
		refresh();
		
	})

	//点击加减
	$('#btn-decrease').click(function (){
		var num=parseInt($('.shop_num').val());
		num--;
		if(num<=1){
			num=1;
		}
		$('.shop_num').val(num);
	
	})
	$('#btn-increase').click(function (){
		var num=parseInt($('.shop_num').val());
		num++;
		$('.shop_num').val(num);
	})

	//点击加入购物车的动画
	//	点击加入购物车弹出框
	
	$('#add_cart').click(function (){
		$('#msg').fadeIn();
		var timer=setTimeout(function (){
			clearTimeout(timer);
			$('#msg').fadeOut();
				
		},10000)
	
	
	})
	//加入成功后弹出框点击关闭
	
	$('.msg_title .close').click(function (){
		
		$('#msg').hide();
		
	})
	//点击继续购物
	$('#continue').click(function (){
		$('#msg').hide();
	});
	
	
	//吸顶效果
	var top=$('.product-tags').offset().top;
	$(window).scroll(function (){
//		console.log($(window).scrollTop());
//		console.log($('.product-tags').offset().top);
		var scrollTop=$(window).scrollTop();
		var flag=false;
		if(scrollTop>=top){
			if(true){
				flag=false;
				$('.product-tags').css({position:'fixed',top:0,boxShadow:'2px 4px 5px rgba(0,0,0,0.3)'});
			}
			
		}else{
			if(!flag){
				flag=true;
				$('.product-tags').css({position:'static',boxShadow:'0px 0px 0px'});
			}
			
		
		}

		//边框滚动到对应位置
//		if(){
//			
//		}
//		
		for(var i=0;i<$('.mod').length;i++){
			var disy=$('.mod').eq(i).offset().top-$('.product-tags').height();
			
			if(scrollTop>=disy){
				$('.tags-hd li').eq(i).css({borderBottom:'3px solid #c69a62'}).siblings('li').css({borderBottom:'none'});
			}
		}
//console.log($('.mod').length);
		

	})
	
	
})
