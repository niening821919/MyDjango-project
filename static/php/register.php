<?php
//支持跨域访问
header('Access-Control-Allow-Origin: *');

$user=$_POST['username'];
$pass=$_POST['opassword'];
//连接数据库MySql
//$conn = new mysqli("127.0.0.1", "root", "", "mydb9") or die("连接失败");
$conn=new mysqli('127.0.0.1','root','','mydbre') or die ('连接失败');

//判断用户名是否已经存在
//$sql = "select * from register where username='$username'";
$sql="select * from register where username='$user'";

//empty()

$result = $conn->query($sql);
//echo $result;
	if($result&&$result->num_rows>0){
		$arr=array('status'=>0,'msg'=>'此用户已存在');
		echo json_encode($arr);
		
	}else{
		//插入数据， 注册
		
			 $sql = "insert into register(username, password) values('$user', '$pass')";
	
    	$result = $conn->query($sql);
//		echo $result;
		
		if($result){
			$arr=array('status'=>1,'msg'=>'注册成功');
			echo json_encode($arr);
		}else{
			$arr=array('status'=>2,'msg'=>'注册失败');
			echo json_encode($arr);
		}
		
	}
//关闭数据库
	$conn->close();


?>