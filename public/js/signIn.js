$(document).ready(function () {
    $("#signIn").on('click',function () {
        //alert("ok")
        $("#logAcount").empty();
        let str=`<li><a href="#"><span class="glyphicon glyphicon-user"></span> email</a></li>`;
        str+=`<li><a href="#"><span class="glyphicon glyphicon-log-out"></span> EXIT</a></li>`

        $("#logAcount").append(str);
    })
    $("#signIn").on('click',function () {
        let email=$("#signEmail").val();
        let password=$("#signPassword").val();
        let confirmPassword=$("#signConfirmPassword").val();
        let usr={"signEmail":email,"signPassword":password,"signConfirmPassword":confirmPassword};
        //let isRemember=$("#signConfirmPassword").is(":checked");
        if(confirmPassword!=password){
              //修改密码边框样式为红 并且提醒密码两次输入不同
            console.log("密码错误");
            $("#signPassword").css("border-color","red");
            $("#signConfirmPassword").css("border-color","red");
            $("bs-example").append( `<p style="color:red" id="error">密码输入不一致</p>`);
        }else {




            $("#signPassword").css("border-color","#ccc");
            $("#signConfirmPassword").css("border-color","#ccc");
            $("#error").empty();
            $.post(`/users`,usr,function (ans) {
            })

            let str2= `<p style="align-content: center">验证邮件已经发送到了${email},请注意查收</p>`;
            $("#content1").empty();
            $("#content1").append(str2);
        }
    })
   /* $get('/checkCode', function (ans){
        if(ans)
    }*/


})