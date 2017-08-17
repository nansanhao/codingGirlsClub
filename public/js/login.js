$(document).ready(function () {
    function getCookie(cname)
    {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++)
        {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "";
    }
    if(document.cookie!=''){
        $("#rememberPassword").attr('checked','checked');
        document.getElementById('loginEmail').value=getCookie('emailId');
        document.getElementById('loginPassword').value=getCookie('password');
    }

    $("#login").on('click',function () {
        let email=$("#loginEmail").val();
        let password=$("#loginPassword").val();
        let isRemember=$("#rememberPassword").is(":checked");

            $.get(`/users/${email}`,function (ans) {
                //console.log(JSON.stringify(ans));
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
                        if(isRemember==true){
                            //记住密码并登录且跳到主页
                            document.cookie=`emailId=${email}; expires=18 Dec 2017 12:00:00 GMT`;
                            document.cookie=`password=${password}; expires=18 Dec 2017 12:00:00 GMT`;
                        }else {
                            //清除cookies
                            document.cookie=`emailId=${email}; expires=18 Dec 2016 12:00:00 GMT`;
                            document.cookie=`password=${password}; expires=18 Dec 2016 12:00:00 GMT`;
                        }
                        $('#test').empty();
                        let str1 = "<div class='alert alert-success alert-dismissible' role='alert' style='font-size: 20px'>"+
                            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                            "<span aria-hidden='true'>&times;</span>"+"</button>"+" SUCCESS&nbsp;!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login successfully</div>";
                        $('#test').append(str1);
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

    })


    
})
