<?php
//支持跨域访问
header('Access-Control-Allow-Origin: *');

$user=$_POST['username'];
$pass=$_POST['opassword'];

//注意会有一条空数据没有判读断$user  $pass不能为空 可以在前端以另一种方式判断
//但是数据库还是有一条空数据，因为一刷新就把空值传进数据库了

//连接数据库MySql
//$conn = new mysqli("127.0.0.1", "root", "", "mydb9") or die("连接失败");
$conn=new mysqli('127.0.0.1','root','','mydbre') or die ('连接失败');

//判断用户名是否已经存在
//$sql = "select * from register where username='$username'";
$sq1="select * from register where username='$user'";
$sq2="select * from register where password='$pass'";
$result1 = $conn->query($sq1);
$result2 = $conn->query($sq2);
//echo $result;
	if($result1&&$result1->num_rows>0){
		if($result2&&$result2->num_rows>0){
			$arr=array('status'=>1,'msg'=>'登录成功');
		}else{
			$arr=array('status'=>0,'msg'=>'密码错误');
		}
		echo json_encode($arr);
		
	}else{
		$arr=array('status'=>2,'msg'=>'此用户名不存在');
		echo json_encode($arr);

	}
//关闭数据库
	$conn->close();


?>