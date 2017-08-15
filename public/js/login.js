$(document).ready(function () {
    $("#login").on('click',function () {
        let email=$("#loginEmail").val();
        let password=$("#loginPassword").val();
        let isRemember=$("#rememberPassword").is(":checked");
        if(isRemember==true){
            //记住密码并登录且跳到主页

        }else {
            $.get(`/users/${email}`,function (ans) {
                console.log(JSON.stringify(ans));
                let user=ans;
                if(ans.length==0){
                    $("#loginPassword").val('');

                    let str = "<div class='alert alert-danger alert-dismissible' role='alert' style='font-size: 20px'>"+
                        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                        "<span aria-hidden='true'>&times;</span>"+"</button>"+" WARNING&nbsp;!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Account does not exist</div>";
                    $("#test").empty();
                    $("#test").append(str);
                }else {
                    //账号存在且信息正确
                    if(user.usrEmail==email&&user.usrPassword==password){
                        $("#logAcount").empty();
                        let str=`<li><a href="/html/accountDetail.html"><span class="glyphicon glyphicon-user"></span> ${email}</a></li>`;
                        str+=`<li><a href=""><span class="glyphicon glyphicon-log-out"></span> EXIT</a></li>`
                        $("#logAcount").append(str);
                        sessionStorage.setItem("emailId",email);
                        $(location).attr('href','/html/home.html');
                    }else{
                        //密码信息错误
                        $("#loginPassword").val('');
                        $('#test').empty()
                        let str = "<div class='alert alert-danger alert-dismissible' role='alert' style='font-size: 20px'>"+
                            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                            "<span aria-hidden='true'>&times;</span>"+"</button>"+" WARNING&nbsp;!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password error</div>";
                        $('#test').append(str);
                    }
                }

            })
        }
    })


    
})