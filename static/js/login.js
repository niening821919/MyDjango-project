$(function () {

    //已记住密码直接登录
    var myName = $.cookie('myName');
    var myPass = $.cookie('myPass');
//	console.log(myName);		没有cookie为undefined
    if (myName != undefined && myPass != undefined) {

        $('#username').val(myName);
        $('#opass').val(myPass);

    }
    //初始化图形码
    var verifyCode = new GVerify("code");

    //验证登录
    $('#subButton').click(function () {
        console.log('登录')

        if (checkingUsername() && checkingPassword()) {
            $('form').submit()
        }
    })

    function checkingUsername() {
        var reg = /.{5,}/;
        var usernameInput = $('#username input')

        if (reg.test(usernameInput.val())) {
            $('.signupbox .reminder').eq(0).html('')

            return true
        } else {
            $('.signupbox .reminder').eq(0).html('!长度不能少于5')

            return false
        }

    }

    function checkingPassword() {
        var reg = /^[0-9a-zA-Z]{6,16}$/
        var passwordInput = $('#pwd input')

        if (reg.test(passwordInput.val())) {
            $('.signupbox .reminder').eq(1).html('')

            return true
        } else {
            $('.signupbox .reminder').eq(1).html('!密码不符合要求')

            return false
        }
    }

})
