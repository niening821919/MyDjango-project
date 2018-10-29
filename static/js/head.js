$(function (){
	
	$('#account_li').hover(function (){
	
			$(this).children('div').stop(true).slideDown();
		},function (){
		
			$(this).children('div').stop(true).slideUp();
	})

	$('.header_right_list>li').hover(function (){
		$(this).css({'background':'#fff'});
		
	
	
		},function (){
			$(this).css({'background':'#f2f2f2'});
	
	})
	
	$('.top_wechat').hover(function (){
			
			$('.noline').show().find('img').attr('src','images/sasa_wechat.jpg');
		},function (){
			$('.noline').hide();
		});
		
	$('.top_microblog').hover(function (){
		$('.noline').show().find('img').attr('src','images/sasa_weion.jpg');
		
	},function (){
		$('.noline').hide();
	});

	
	$('#sub_items').hover(function (){
		$(this).find('.sasa_category').show();
	},function (){
		$(this).find('.sasa_category').hide();
	})
	
	$('#sasa_category_ul li').hover(function (){
		$(this).children('.sasa_category_sidebox').show();
			
	},function (){
		$(this).children('.sasa_category_sidebox').hide();
	})
	
	$('#sub_nav_list>li:last-child').hover(function (){
		
		$('#nav-itembox').show();
		
	},function (){
		$('#nav-itembox').hide();
	})
	
	
	//右边悬浮栏
	//console.log($('#sidebar-box').find('.mui-mbar-tab').not($('#mysidecode')[0]));
	$('#sidebar-box').find('.mui-mbar-tab').hover(function (){
		console.log(111);
		$(this).children('.mui-mbar-tab-tip').show().stop(true).animate({left:'-100px',opacity:1});
	},function (){
		 $that=$(this);
		$(this).children('.mui-mbar-tab-tip').stop(true).animate({left:'-200px',opacity:0},function (){
			$that.children('.mui-mbar-tab-tip').hide();
			
		});
	})
	
	$('.mysidecode').hover(function (){
		console.log(111);
		$(this).children('#mysidecode').show().stop(true).animate({left:'-140px',opacity:1});
	},function (){
		 $that=$(this);
		$(this).children('#mysidecode').stop(true).animate({left:'-200px',opacity:0},function (){
			$that.children('#mysidecode').hide();
			
		});
	})
	
	
	$('.sideup').click(function (){
		
		$('html,body').animate({scrollTop:0});
		
	})
	
	
	$('.top_server #server_s').click(function (){
		console.log($('#text_s').val());
		if($('#text_s').val()!=''){
			
			location.href='list.html';
			return false;
		}else{
			return false;
		}
		
	})

	//鼠标移入顶部购物
	$('#cartLi').hover(function (){
		var str=$.cookie('myCart');
		var arr=str==undefined?[]:JSON.parse(str);
		if(arr.length==0){//没商品时
			$(this).children('#myCart').show().siblings('.miniCarDetail').hide();
		
		
		}else{//	//购物车有商品时
			
			$(this).children('.miniCarDetail').show().siblings('#myCart').hide();
			
		}
			
		},function (){
		
			$(this).children('div').hide();
	})
//	事件委托点击顶部购物车的删除图标
	$('.miniCarDetail_list').on('click','.deleteicon',function (){
//		console.log($(this).attr('class'));
//			$(this).parents('.miniCarDetail_dl').parent('li').remove();
		var index=$(this).index('.miniCarDetail_list .deleteicon');
//		console.log($(index);
		
		var arr=$.cookie('myCart')==undefined?[]:JSON.parse($.cookie('myCart'));
		arr.splice(index,1);
		$.cookie('myCart',JSON.stringify(arr),{expires:30,path:'/'});
		topCart();
		numCart();
	})

//		topCart();
//		function topCart(){
//			
//			var arr=$.cookie('myCart')==undefined?[]:JSON.parse($.cookie('myCart'));
////			console.log(arr);
//			for(var i=0;i<arr.length;i++){
//				var li_dl=$('<li></li>').appendTo($('.miniCarDetail_list'));
//				var str='<dl class=miniCarDetail_dl><dt><a href=javascript:;><img src='+arr[i].img+'></a></dt>'+
//				'<dd><p class=h_title>'+arr[i].title+'</p>'+
//				'<p class=price_p><span class=x_price>'+arr[i].price+'</span><span class=x_num>x'+arr[i].num+'</span>'+
//				'<span class=deleteicon><i class=iconfont>&#xe63f;</i></span></p></dd></dl>'
//				li_dl.append(str);
//			}
//		}
		
})
//购物车有商品时
//		topCart();
		function topCart(){
			$('.miniCarDetail_list li').remove();
			var arr=$.cookie('myCart')==undefined?[]:JSON.parse($.cookie('myCart'));
//			console.log(arr);
			for(var i=0;i<arr.length;i++){
				var li_dl=$('<li></li>').appendTo($('.miniCarDetail_list'));
				var str='<dl class=miniCarDetail_dl><dt><a href=javascript:;><img src='+arr[i].img+'></a></dt>'+
				'<dd><p class=h_title>'+arr[i].title+'</p>'+
				'<p class=price_p><span class=x_price>'+arr[i].price+'</span><span class=x_num>x'+arr[i].num+'</span>'+
				'<span class=deleteicon><i class=iconfont>&#xe63f;</i></span></p></dd></dl>'
				li_dl.append(str);
			}
		}
		
//总计商品数量
	function numCart(){
		var str=$.cookie('myCart');
		var arr=str==undefined?[]:JSON.parse(str);
		var num=0;
		for(var i=0;i<arr.length;i++){
			num+=arr[i].num;
		}
		$('.js_cartnum').html(num);
		
	}