
$(function (){
	
	var arr=[];
	refresh();
	function refresh(){
		arr=$.cookie('myCart')==undefined?[]:JSON.parse($.cookie('myCart'));
		console.log(arr);
		if(arr.length==0){
			$('.cart-empty').show().siblings('#main_shop').hide();
			console.log(111);
		}else{
			$('.cart-empty').hide().siblings('#main_shop').show();
			
		}
		$('#cart_list .cart_detail').remove();
		var num=0;
		var allTotal=0;
		for(var i=0;i<arr.length;i++){
	//		console.log(arr[i].num)
	//		console.log(arr[i].price.replace('￥','')*arr[i].num);
			var li=$('<li class=cart_detail></li>').appendTo($('#cart_list'));
			
			if(arr[i].checked){
				var str1='<input type=checkbox class=ckbed checked=checked />';
			}else{
				var str1='<input type=checkbox class=ckbed />';
			}
			
			str2='<div class=J-pic>'+str1+'<a href=javascript:; ><img src='+arr[i].img+'></a></div>'+
			'<div class=J-state><p class=ui-carttable-title><a href=#>'+arr[i].title+'</a></p><p class=ui-carttable-spec>'+arr[i].quality+'</p></div>'+
			'<div class=J-price>'+arr[i].price+'</div>'+
			'<div class=J-quantity><span class=btn-decrease>-</span><input type=text class=shop_num value='+arr[i].num+' /><span class=btn-increase>+</span></div>'+
			'<div class=J-subtotal>￥'+arr[i].price.replace('￥','')*arr[i].num+'.0</div>'+
			'<div class=J-btnDelete><a href=javascript:;>删除</a></div>';
			li.append(str2);
			
			if(arr[i].checked){
				num++;
				allTotal+=arr[i].price.replace('￥','')*arr[i].num;
				
			}
			
		}
		
		if(num==arr.length&&arr.length!=0){
			$('.title_allChecked input').prop('checked',true);
		}else{
			$('.title_allChecked input').prop('checked',false);
		}	
		
		//加入成功后购物车显示数量
		numCart();
//		总计商品选中数量
		selectNum();
		//加入成功后购物车显示数量
		function selectNum(){
			var str=$.cookie('myCart');
			var arr=str==undefined?[]:JSON.parse(str);
			var num=0;
			for(var i=0;i<arr.length;i++){
				if(arr[i].checked){
					num+=arr[i].num;
				}
				
			}
			$('.items-quantity').html(num);
			
		}
//		总计选中钱数
		$('.promotion-subtotal').html('￥'+allTotal+'.0');
		
		
		//购物车有商品时顶部
		topCart();

	}
////总计商品数量
//	function numCart(){
//		var str=$.cookie('myCart');
//		var arr=str==undefined?[]:JSON.parse(str);
//		var num=0;
//		for(var i=0;i<arr.length;i++){
//			num+=arr[i].num;
//		}
//		$('.js_cartnum').html(num);
//		
//	}
	
	//点击加减
	$('#cart_list').on('click','.btn-decrease',function (){
//		$(this).index();
//		console.log($(this).index('.btn-decrease'));
		var index=$(this).index('.btn-decrease');
		arr[index].num--;
		if(arr[index].num<=1){
			arr[index].num=1;
		}
		$.cookie('myCart',JSON.stringify(arr),{expires:30,path:'/'});
		refresh();
		
	})
	
	$('#cart_list').on('click','.btn-increase',function (e){
		e.stopPropagation();
		e.preventDefault();
		var index=$(this).index('.btn-increase');
		arr[index].num++;
		$.cookie('myCart',JSON.stringify(arr),{expires:30,path:'/'});
		refresh();
		
	})

	//删除
	$('#cart_list').on('click','.J-btnDelete',function (e){
		
		var index=$(this).index('.J-btnDelete');
		arr.splice(index,1);
		$.cookie('myCart',JSON.stringify(arr),{expires:30,path:'/'});
		refresh();
		
	})
		
	//选择
	$('#cart_list').on('click','.ckbed',function (){
		
		var index=$(this).index('.ckbed');

		arr[index].checked=$(this).prop('checked');

		$.cookie('myCart',JSON.stringify(arr),{expires:30,path:'/'});
		
		refresh();

		
	})
	//点击全选
	$('.title_allChecked input').click(function (){
		
		if($(this).prop('checked')){
			for(var i=0;i<arr.length;i++){
				arr[i].checked=true;
			}
		}else{
			for(var i=0;i<arr.length;i++){
				arr[i].checked=false;
			}
		}
		
		$.cookie('myCart',JSON.stringify(arr),{expires:30,path:'/'});
		refresh();
		
	})
	
})

