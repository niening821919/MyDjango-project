function getCookie(key){
//				  xxx
//				document.write(document.cookie);   //

		var str=document.cookie;				
					
		var arr=str.split('; ');   /*注意分割*/   //[username=zhangsan,age=60,sex=nan]
						
		for(var i=0;i<arr.length;i++){
			
			var arr1=arr[i].split('=');					
			if(arr1[0]==key){						
				return arr1[1];
			}
		}	
	return [];	
		
}
	
	
	

/*
 
 key 表示cookie的名字
 
 value 表示cookie的值
 
  expires 表示过期时间    （ms）毫秒
 * */


function setCookie(key,value,expires){
	
	if(arguments.length<2){
		
		return 'error:参数不能少于两个';
	}else{
		//参数是对的					
		
		var str=key+'='+value;					
		
		if(expires){
			
			var d=new Date();						
//						d.getTime()获取时间戳

			//alert(parseInt(expires)+d.getTime());

 //                     d.setTime()  时间戳转换成日期						
			d.setTime(parseInt(expires)+d.getTime());						
			
			str+=';expires='+d;
			
		}		
							
		
		document.cookie=str;
		
	}
	
}
