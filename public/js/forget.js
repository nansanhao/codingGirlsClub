$(document).ready(function () {
    $("#forgetResetPassword").on('click', function () {
        var email = $("#forgetEmail").val();
        var password = $("#forgetPassword").val();
        var user = {"signEmail": email, "signPassword": password};
        $.post("/change_pass",user, function (res) {
            if (res) {
                $('#test').empty();
                let str = "<div class='alert alert-danger alert-dismissible' role='alert' style='font-size: 20px'>"+
                    "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                    "<span aria-hidden='true'>&times;</span>"+"</button>"+" WORNING&nbsp;!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The mailbox is not registered</div>";
                $('#test').append(str);
            }
        })
    })
})