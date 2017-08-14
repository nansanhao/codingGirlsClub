$(document).ready(function () {
    $("#send_mail").on('click', function () {
        var email = $("#mail").val();
        var password = $("#repass").val();
        var user = {"signEmail": email, "signPassword": password};
        $.post("/change_pass", function (res) {

            if (res) {
                alert("邮箱不存在");
            }

        })


    })
})