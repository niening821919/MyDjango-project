
$(function (){
	
	//点击显示更多
	$('.filter-entries-more .more').click(function (){
//		console.log($(this).attr('class'));
		$(this).hide().siblings('.more').show();
		var str=$(this).children('span').html();
		//		console.log(str);
		if(str=='收起'){
			$(this).parent().siblings('.filter-entries-values').find('.filter-item-hide').hide();
		}else{
			$(this).parent().siblings('.filter-entries-values').find('.filter-item-hide').show();
		}
	
	})
	
	
//		销售  人气
	$('.gallery_sortbar_fl a').click(function (){
		
		$(this).siblings('a').children('span').remove();
		$(this).addClass('active').siblings('a').removeClass('active');
		$('<span></span>').appendTo($(this));
		
	})
	
	
//	鼠标移入非class='normal'
	$('.arrivalslist li:not(".normal")').on({
		
		'mouseenter':function (){
//			console.log($(this).index());

			$(this).css('z-index',999).children('.formall').addClass('wd_active')
			.stop(true).animate({width:'338px',height:'520px'})
			.children('.formalpic')
			.css({display:'block'})
			.parents('li').siblings().css('z-index',0).children('.formall').removeClass('wd_active');
			
		},
		'mouseleave':function (){
//			console.log($(this).index());
			$(this).children('.formall').removeClass('wd_active').stop(true).animate({width:'253px',height:'482px'})
			.children('.formalpic').css({display:'none'});
		}
	});

	//	鼠标移入class='normal'
	
	$('.arrivalslist li.normal').on({
		
		'mouseenter':function (){
	//		console.log($(this).index());
				
				
			$(this).css('z-index',999).children('.formall').addClass('wd_active')
			.stop(true).animate({height:'520px'})
//			.children('.formalpic')
//			.css({display:'block'})
			.parents('li').siblings().css('z-index',0).children('.formall').removeClass('wd_active');
			
		},
		
		'mouseleave':function (){
//			console.log($(this).index());
			$(this).children('.formall').removeClass('wd_active').stop(true).animate({height:'482px'});
//			.children('.formalpic').css({display:'none'});
		}
	
	})

	//移入小图类似放大镜
	$('.formalpic_list li img').on('mouseenter',function (){
		
		var str=$(this).attr('src');	//src='images/list1_1_1.jpg'		src='images/list1_2_1.jpg'
//		console.log(str);
		$(this).parent().addClass('br_active').siblings('li').removeClass('br_active').parents('.formalpic').siblings('.arrivals-pic').find('img').attr('src',str.replace('_1_','_2_'));
//		parents('.formalpic + .arrivals-pic').attr('class');
//		.find('img').attr('src');//str.replace('_2_','_1_')
		
		
	})
	
	//一打开就绚染商品数量
	numCart();
	topCart();
	//	点击商品加入购物车
//	console.log($('.cart_btn').length);
	var arr=[];
	$('.cart_btn').click(function (e){
		//商品加入购物车动画
		 //结束的地方的元素
		var offset = $("#end_cart").offset(); 
//		console.log($("#end_cart").css('color'))
//		console.log(offset.left+'-----'+offset.top);
		var img = $(this).siblings('.arrivals-pic').find('img').attr('src');
		var flyer = $('<img class="u-flyer" src="'+img+'">');
		flyer.fly({
			//开始位置
			start:{
					left:e.clientX,
					top:e.clientY
				},
				//结束位置
			end:{
					left:offset.left,
					top:offset.top-$(window).scrollTop(),
					width:0,
					height:0
					
			},
			//结束后执行
			onEnd:function (){
					flyer.remove();
					$('#msg').fadeIn();
					//		数量绚染
						numCart();
						topCart();
					var timer=setTimeout(function (){
						clearTimeout(timer);
						$('#msg').fadeOut();
						
					},10000)
				} 
		})
		var obj={};
		obj.img=$(this).siblings('.arrivals-pic').find('img').attr('src');
		var str1=$(this).siblings('.arrivals-info').children('.title').find('a').html();
//		console.log(obj.title);
		var str2=$(this).siblings('.arrivals-info').children('.explain').find('a').html();
		obj.title=str1+str2;
		obj.quality=$(this).siblings('.arrivals-info').children('.quality').html();
		obj.price=$(this).siblings('.sale-price').children('.price').html();
		obj.id=$(this).index('.cart_btn');
		arr=$.cookie('myCart')==undefined?[]:JSON.parse($.cookie('myCart'));
		var flag=true;
		for(var i=0;i<arr.length;i++){
			if(arr[i].id==obj.id){
			
				flag=false;
				arr[i].num++;
			}
	
		}
		if(flag){
			obj.num=1;
			obj.checked=false;
			arr.push(obj);
			
		}
		$.cookie('myCart',JSON.stringify(arr),{expires:30,path:'/'});

	})
	//加入成功后购物车显示数量
	function numCart(){
		var str=$.cookie('myCart');
		var arr=str==undefined?[]:JSON.parse(str);
		var num=0;
		for(var i=0;i<arr.length;i++){
			
			num+=arr[i].num;
		}
		$('.js_cartnum').html(num);
		
	}
	

	//加入成功后弹出框点击关闭
	
	$('.msg_title .close').click(function (){
		
		$('#msg').hide();
		
	})
	//点击继续购物
	$('#continue').click(function (){
		$('#msg').hide();
	});
	
	//点击图片进入商品详情
	$('.arrivals-pic').click(function (){
		
//		console.log($(this).index('.arrivals-pic'));
		location.href='detail.html?id='+$(this).index('.arrivals-pic');
		return false;
	})

})
