

$(function (){

	//已记住密码直接登录
	var myName=$.cookie('myName');
	var myPass=$.cookie('myPass');
//	console.log(myName);		没有cookie为undefined
	if(myName!=undefined&&myPass!=undefined){
		
		$('#username').val(myName);
		$('#opass').val(myPass);
		
	}
	//初始化图形码
	var verifyCode = new GVerify("code");
	//验证登录
	$('#btn').click(function (){
		
		var nameVal=$('#username').val();
		var passVal=$('#opass').val();
		var codeVal=$('#text-code').val()
		//验证码校对

		var res = verifyCode.validate(codeVal);
		
		if(nameVal.length==0||passVal.length==0){
			alert('请输入用户名或密码');
		}else{
			if(codeVal==''){
				$('.reminder').eq(2).html('！验证码不能为空');
			}else if(res){
				$.post('http://127.0.0.1/ajax/sasaWebsite/php/login.php',{username:nameVal,opassword:passVal},function (data){
//					console.log(data);
					var obj=JSON.parse(data);
					if(obj.status==1){
//						console.log(obj.msg);
						if($('#remember_pw').prop('checked')){
							$.cookie('myName',nameVal,{expires:10,path:'/'});
							$.cookie('myPass',passVal,{expires:10,path:'/'});
						}
						
						
						$('.login_success').show();
						
						var timer=setTimeout(function (){
								clearInterval(timer);
								$('.loading').hide().remove();
								location.href='index.html';
							
						},1000)
						
					}else if(obj.status==0){
						$('.reminder').eq(1).html(obj.msg);
//						console.log(obj.msg);
					}else if(obj.status==2){
						$('.reminder').eq(0).html(obj.msg);
//						console.log(obj.msg);
					}
					
				})
			}else{
				
				$('.reminder').eq(2).html('！验证码错误');
				
			}
			
			return false;	
		}
	})
	
	$('#username').blur(function (){
							
		$('.reminder').eq(0).html('');	
	})
	
	$('#opass').blur(function (){
							
		$('.reminder').eq(1).html('');	
	})
	
	$('#text-code').blur(function (){
							
		$('.reminder').eq(2).html('');	
	})
	

//	//点击更换验证码
//	$('#code').click(function (){
//		
//		$(this).html(authCode());
//	})
//	
//	
//	//随机生成验证码
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
//	
//	
	
})
