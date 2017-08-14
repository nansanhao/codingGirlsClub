$(document).ready(function () {
    $("#signIn").on('click',function () {
        //alert("ok")
        $("#logAcount").empty();
        let str=`<li><a href="#"><span class="glyphicon glyphicon-user"></span> email</a></li>`;
        str+=`<li><a href="#"><span class="glyphicon glyphicon-log-out"></span> EXIT</a></li>`

        $("#logAcount").append(str);
    })
    $("#signIn").on('click',function () {
        let email = $("#signEmail").val();
        let password = $("#signPassword").val();
        let confirmPassword = $("#signConfirmPassword").val();
        let usr = {"signEmail": email, "signPassword": password, "signConfirmPassword": confirmPassword};
        //let isRemember=$("#signConfirmPassword").is(":checked");



                $.post(`/users`, usr, function (ans) {
                })

               alert(  `验证邮件已经发送到了${email},请注意查收`);
                $("#content1").empty();
                $("#content1").append(str2);


    })
   /* $get('/checkCode', function (ans){
        if(ans)
    }*/


})