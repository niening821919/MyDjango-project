

$(function (){
	
	//用户名
	$('.signupbox .form-act').eq(0).children('input').blur(function (){
		var reg=/.{5,}/;
		
		if(reg.test($(this).val())){
			$('.signupbox .reminder').eq(0).html('');
		}else if($(this).val()==''){
			$('.signupbox .reminder').eq(0).html('!用户名不能为空');
			
		}else{
			$('.signupbox .reminder').eq(0).html('!长度不能少于5');
		}
		
	});
	
	
	//密码
	$('.signupbox .form-act').eq(1).children('input').blur(function (){
		var reg=/^[0-9a-zA-Z]{6,16}$/;
		var num=/\d/;
		var str=/[a-zA-Z]/;
		
		if(reg.test($(this).val())){
			if(num.test($(this).val())){
				if(str.test($(this).val())){
					$('.signupbox .reminder').eq(1).html('');
				}else{
					$('.signupbox .reminder').eq(1).html('!必须包含字母');
				}
			}else{
				$('.signupbox .reminder').eq(1).html('!必须含有数字');
			}
			
		}else if($(this).val()==''){
			$('.signupbox .reminder').eq(1).html('!密码不能为空');
			
		}else{
			$('.signupbox .reminder').eq(1).html('!密码不符合要求');
		}
		
	});
	
	
	//确认密码
	$('.signupbox .form-act').eq(2).children('input').blur(function (){
		if($(this).val()==''){
			$('.signupbox .reminder').eq(2).html('!确认密码不能为空');
		}else if($(this).val()==$('.signupbox .form-act').eq(1).children('input').val()){
			$('.signupbox .reminder').eq(2).html('');
			
		}else{	
			$('.signupbox .reminder').eq(2).html('!密码不正确');
		}
		
	});
	
	
	//验证码
	var verifyCode = new GVerify("code");
	$('.signupbox .form-act').eq(3).children('input').blur(function (){
	
		var res = verifyCode.validate($(this).val());
//		console.log(res);
		if($(this).val()==''){
			$('.signupbox .reminder').eq(3).html('！验证码不能为空');
		}else if(res){
//				alert("验证正确");
			$('.signupbox .reminder').eq(3).html('');

		}else{
//				alert("验证码错误");
			$('.signupbox .reminder').eq(3).html('!验证码错误');

		}
	})

	//点击更换验证码
//	$('#code').click(function (){
//		
//		$(this).html(authCode());
//	})
//	
	
	//随机生成验证码
//	function authCode(){
//		var arr=[1,2,3,4,5,6,7,8,9,0,'q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',
//		'z','x','c','v','b','n','m','Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L',
//		'Z','X','C','V','B','N','M'];
//		//console.log(arr.length)
//		var str='';
//		for(var i=0;i<4;i++){
//			
//			str+=arr[parseInt(Math.random()*62)];
//		}
//		//console.log(str);
//		return str;
//		
//	}
//	$('#code').html(authCode());
	
	//提交
	$('#btn').click(function (){
		var name=$('.signupbox .form-act').eq(0).children('input').val();
		var opass=$('.signupbox .form-act').eq(1).children('input').val();
		if(passMuster()){
			//保存cookie;
//			setCookie('username',$('.signupbox .form-act').eq(0).children('input').val());
//			setCookie('password',$('.signupbox .form-act').eq(1).children('input').val());
			
			//后台数据请求
			
			$.post('http://127.0.0.1/ajax/sasaWebsite/php/register.php',{username:name,opassword:opass},function (data){
				var obj=JSON.parse(data);
				if(obj.status==0){
					$('.signupbox .reminder').eq(0).html(obj.msg);
//					console.log(obj.msg);
				}else if(obj.status==1){//注册 成功
					
//					console.log(obj.msg);
					
					$('.login_success').show();
						
						var timer=setTimeout(function (){
								clearInterval(timer);
								$('.loading').hide().remove();
								location.href='login.html';
						},1000)

				}else{
					console.log(obj.msg);
				}
				
			})
			//页面跳转
//			location.href='login.html';
		}else if(name==''){
			$('.signupbox .reminder').eq(0).html('!用户名不能为空');
		}else if(opass==''){
			
			$('.signupbox .reminder').eq(1).html('!密码不能为空');
		}else if($('.signupbox .form-act').eq(2).children('input').val()==''){
			$('.signupbox .reminder').eq(2).html('!确认密码不能为空');
		}else if($('.signupbox .form-act').eq(3).children('input').val()==''){
			
			$('.signupbox .reminder').eq(3).html('!验证码不能为空')
		}
		return false;	//阻止浏览器默认行为（表单提交）

	})
	
	//验证所有信息都符合要求
	
	function passMuster(){
		
		for(var i=0;i<$('.signupbox .reminder').length;i++){
			
			if($('.signupbox .reminder').eq(i).html()!=''){
				return false;
			}
			
			if($('.signupbox .form-act').eq(i).children('input').val()==''){
				return false;
			}
		}
		
		return true;
	}
		
})
