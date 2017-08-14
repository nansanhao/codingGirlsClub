$(document).ready(function () {

    $("#login").on('click',function () {
        let email=$("#loginEmail").val();
        let password=$("#loginPassword").val();
        let isRemember=$("#rememberPassword").is(":checked");
        if(isRemember==true){
            //记住密码并登录且跳到主页

        }else {
            $.get(`/users/${email}`,function (ans) {
                alert(JSON.stringify(ans));
                let user=ans;
                //信息正确
                if(user.usrEmail==email&&user.usrPassword==password){
                    $("#logAcount").empty();
                    let str=`<li><a href="/html/accountDetail.html"><span class="glyphicon glyphicon-user"></span> ${email}</a></li>`;
                    str+=`<li><a href=""><span class="glyphicon glyphicon-log-out"></span> EXIT</a></li>`
                    $("#logAcount").append(str);
                    sessionStorage.setItem("emailId",email);
                    $(location).attr('href','/html/home.html');
                }else{
                    //账户信息错误
                    $("#loginPassword").val('');
                    let str=`<div class="alert alert-danger alert-dismissable">
                                <button type="button" class="close" data-dismiss="alert"
                                        aria-hidden="true">
                                    &times;
                                </button>
                                错误！账户信息输入不正确。
                            </div>`
                    $("#passwordInput").after(str)
                }
            })
        }
    })


    
})