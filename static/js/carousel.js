


$(function (){
	
	//轮播图
	
	$.ajax({
		type:"get",
		url:"json/lunbotu.json",
		async:true,
		success:function (data){
			
			for(var i=0;i<data.length;i++){
				var liImg=document.createElement('li');
				var iconImg=document.createElement('li');
				
				liImg.style.background='url('+data[i].pic+') no-repeat center';
				liImg.innerHTML='<a href="#"></a>';
				$('#banner_list').append(liImg);
				$('#banner_list_icon').append(iconImg);
				
			}
			
			lunbotu();
		}

	});
	
	function lunbotu(){
		//console.log($('.banner').width());
		var target=($('.banner').width()-$('#banner_list_icon').width())/2;
		$('#banner_list_icon').css({left:target});
		$('#banner_list_icon li').eq(0).css('background','#fa3778');
		$('#banner_list li').eq(0).css('opacity',1);
		var bannerList=$('#banner_list');
		var j=0;
		var timer=null;
		timer=setInterval(function (){
			j++;
			
			stateMove();
		},6000)
		
		function stateMove(){
			if(j==7){
				j=0;
			}
			$('#banner_list li').eq(j).stop(true).animate({opacity:1},1000).siblings().stop(true).animate({opacity:0});
			$('#banner_list_icon li').eq(j).css('background','#fa3778').siblings().css('background','#333');
			
		}
		
		$('#banner_list').hover(function (){
			clearInterval(timer);
		},function (){
			timer=setInterval(function (){
				j++;
				
				stateMove();
			},6000)
			
		});
		$('#banner_list_icon li').mouseenter(function (){
			$(this).css('background','#fa3778').siblings().css('background','#333');
			j=$(this).index();
			stateMove();
		})
	}
	

	//滚动文字
	notice();
	function notice(){
		var nativeTimer=null;
		var i=0;
		var liHeight=$('#broadcast_list li').eq(0).height();
		setInterval(function (){
			i++;
			if(i==$('#broadcast_list li').length){
				$('#broadcast_list').css({top:0});
				i=1;
			}
			
			$('#broadcast_list').stop(true).animate({top:-liHeight*i},1000);
			
		},5000)
			
	}
	
	//倒计时 
	countDown();
	function countDown(){
		
		
		//console.log(d.getTime());
		
			
//		console.log(d.getHours());
//		console.log(d.getMinutes());
//		console.log(d.getSeconds());
			
			var timer=null;
			
			var d=new Date();
			var endDate=new Date();
			endDate.setTime(d.getTime()+23*3600*1000);
			$('html,body').scrollTop(0);
			var target=endDate.getTime();
			timer=setInterval(function (){
				var statsDate=new Date();
				i=target-statsDate.getTime();
				//console.log(i);
				$('.hour').html(add(parseInt((i/(1000*3600))%24)));
				$('.minute').html(add(parseInt((i/(1000*60))%60)));
				$('.seconds').html(add(parseInt((i/1000)%60)));
				
			},1000)
				
			function add(num){
				//console.log(num)
				if(num<=9){
					return '0'+num;
				}
				
				return num;
			}
	}
	
	var $foolr=$('#main_content .foolr');
	//悬浮左边栏
	var clientHeight=$(window).height();
	$floor_location=$('#floor_location');
	
	var flag=true;
	var isMove=true;
	$(window).scroll(function (){
		var top=$(window).scrollTop();
		if(top>=$('.sasa_mustcheck').offset().top){
			if(!flag){
				flag=true;
				$floor_location.css({position:'fixed',top:'25%'}).css('z-index',999);
			//	console.log(111);
			}
			
		}else{
			if(flag){
				flag=false;
				//console.log(222);
				$floor_location.css({position:'absolute',top:'760px'});

			}	
		}

		for(var i=0;i<$foolr.length;i++){
			if(top+clientHeight/2>=$foolr.eq(i).offset().top){
				if(isMove){
					$floor_location.find('li').eq(i).addClass('bg_active').siblings().removeClass('bg_active');
				}
				
			}
		
		}
	})
	$floor_location.find('li:not(:last-child)').click(function (){
		$(this).addClass('bg_active').siblings().removeClass('bg_active');
		
		var divTop=$foolr.eq($(this).index()).offset().top;
//		console.log($('#main_content .foolr').eq($(this).index()));
			isMove=false;
		$('html,body').stop(true).animate({scrollTop:divTop},function (){
			isMove=true;
			
		});
			
	})
	
	$floor_location.find('li:last-child').click(function (){
		isMove=false;
		$('html,body').stop(true).animate({scrollTop:0},function (){
			isMove=true;
		});
		
	})
	
	//购物车中商品数量
	numCart();
	//购物车有商品时顶部
	topCart();


})
	


