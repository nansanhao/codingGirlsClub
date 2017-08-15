$(document).ready(function () {
<<<<<<< HEAD
    $("#signIn").on('click',function () {
        //alert("ok")
        $("#logAcount").empty();
        let str=`<li><a href="#"><span class="glyphicon glyphicon-user"></span> email</a></li>`;
        str+=`<li><a href="#"><span class="glyphicon glyphicon-log-out"></span> EXIT</a></li>`

        $("#logAcount").append(str);
    })
=======

>>>>>>> 3b1275ac164757b1539d9a2d412b21f761b5152a
    $("#signIn").on('click',function () {
        let email = $("#signEmail").val();
        let password = $("#signPassword").val();
        let confirmPassword = $("#signConfirmPassword").val();
        let usr = {"signEmail": email, "signPassword": password, "signConfirmPassword": confirmPassword};
<<<<<<< HEAD
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


=======

        $.post(`/users`, usr, function (ans) {
            //alert(ans);
            if(ans=="ok"){
                $('#test').empty();
                let str = "<div class='alert alert-success alert-dismissible' role='alert' style='font-size: 20px'>"+
                    "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                    "<span aria-hidden='true'>&times;</span>"+"</button>"+" WARNING&nbsp;!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Registered successfully,please go to mailbox activation</div>";
                $('#test').append(str);
                $("#signEmail").attr("disabled","disabled");
                $("#signPassword").attr("disabled","disabled");
                $("#signConfirmPassword").attr("disabled","disabled");
                $("#signIn").attr("disabled","disabled");
            }else {
                let str = "<div class='alert alert-danger alert-dismissible' role='alert' style='font-size: 20px'>"+
                    "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                    "<span aria-hidden='true'>&times;</span>"+"</button>"+" WARNING&nbsp;!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The mailbox has been registered</div>";
                $('#test').append(str);
            }

        })
    })
>>>>>>> 3b1275ac164757b1539d9a2d412b21f761b5152a
})