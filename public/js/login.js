$(document).ready(function () {
    $("#login").on('click',function () {
        //alert("ok")
        $("#logAcount").empty();
        let str=`<li><a href="#"><span class="glyphicon glyphicon-user"></span> email</a></li>`;
        str+=`<li><a href="#"><span class="glyphicon glyphicon-log-out"></span> EXIT</a></li>`

        $("#logAcount").append(str);
    })
    $("#login").on('click',function () {
        let email=$("#loginEmail").val();
        let password=$("#loginPassword").val();
        let isRemember=$("#loginForgetPassword").is(":checked");
        if(isRemember==true){
            //记住密码并登录且跳到主页
        }else {
            $.get(`/usrs/${email}`,function (ans) {
                let user=JSON.parse(ans);
                $("#logAcount").empty();
                let str=`<li><a href="/html/accountDetail.html"><span class="glyphicon glyphicon-user"></span> ${email}</a></li>`;
                str+=`<li><a href="/html/login.html"><span class="glyphicon glyphicon-log-out"></span> EXIT</a></li>`

                $("#logAcount").append(str);
                if(user.usrEmail==email&&user.usrPassword==password){
                    $("#logAcount").empty();
                    let str=`<li><a href="/html/accountDetail.html"><span class="glyphicon glyphicon-user"></span> ${email}</a></li>`;
                    str+=`<li><a href="/html/login.html"><span class="glyphicon glyphicon-log-out"></span> EXIT</a></li>`

                    $("#logAcount").append(str);

                }else{
                    //账户信息错误
                }
            })
        }
    })


    
})