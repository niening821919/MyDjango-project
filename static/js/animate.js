

		function getStyle(el,attr){
			if(getComputedStyle){			//非IE非行间样式（计算后的样式）
					
				return getComputedStyle(el,false)[attr];
			}
			return el.currentStyle[attr];
		}
		
		
			function move(el,json,fn){
			
				var step=0;
				
				clearInterval(el.timer);
				
				var current;
				el.timer=setInterval(function (){
					var flag=true;
					for(var attr in json){
					
						if(attr=='opacity'){//透明度
							current=Math.round(getStyle(el,attr)*100);  //不能用parseInt();
							
						}else{//非透明度
							current=parseInt(getStyle(el,attr));
						
							
						}
						step=(json[attr]-current)/8;
						step=step>0?Math.ceil(step):Math.floor(step);
						
						
						if(json[attr]!=current){//所有属性都到达目标就不执行这里
							flag=false;
							
						}
						if(flag){
							clearInterval(el.timer);
							console.log('222');
							if(attr=='opacity'){
								el.style[attr]=json[attr]/100;
								el.style.filter='alpha(opacity='+json[attr]+')';
							}else{
								
								el.style[attr]=json[attr]+'px';
							}
							
							if(fn){//回调函数
								fn();
							}else{
								return false;
							}
							
						}
						if(attr=='opacity'){
							el.style[attr]=(current+step)/100;
							el.style.filter='alpha(opacity='+(current+step)+')';

						}else{
							
							el.style[attr]=current+step+'px';
							
							
						}
					}	
						
				},30);

			}