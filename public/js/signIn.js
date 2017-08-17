$(document).ready(function () {

    $("#signIn").on('click',function () {
        let email = $("#signEmail").val();
        let password = $("#signPassword").val();
        let confirmPassword = $("#signConfirmPassword").val();
        let usr = {"signEmail": email, "signPassword": password, "signConfirmPassword": confirmPassword};

        $.post(`/users`, usr, function (ans) {
            //alert(ans);
            if(ans=="ok"){
                $('#test').empty();
                let str = "<div class='alert alert-success alert-dismissible' role='alert' style='font-size: 20px'>"+
                    "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                    "<span aria-hidden='true'>&times;</span>"+"</button>"+" SUCCESS&nbsp;!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Registered successfully,please go to mailbox activation</div>";
                $('#test').append(str);
                $("#signEmail").attr("disabled","disabled");
                $("#signPassword").attr("disabled","disabled");
                $("#signConfirmPassword").attr("disabled","disabled");
                $("#signIn").text("SEND EMAIL AGAIN");
            }else {
                $('#test').empty();
                let str = "<div class='alert alert-danger alert-dismissible' role='alert' style='font-size: 20px'>"+
                    "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                    "<span aria-hidden='true'>&times;</span>"+"</button>"+" WARNING&nbsp;!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The mailbox has been registered</div>";
                $('#test').append(str);
            }

        })
    })
})