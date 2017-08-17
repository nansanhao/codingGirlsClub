'use strict';
let emailId=sessionStorage.getItem("emailId");
window.onload = function(){
    $.get(`/users/${emailId}`,function (usr,status){
        //console.log(JSON.stringify(usr));
        //console.log(usr.id);
        //console.log(usr.usrCompanyAddress);
        $('#detailEmail').attr('value', usr.usrEmail) ;
        // $('#detailCurrentPassword').attr('value', usr[0].usrPassword) ;
        $('#detailCompanyName').attr('value', usr.usrCompanyName) ;
        $('#detailCompanyAddress').attr('value', usr.usrCompanyAddress) ;
        $('#detailCompanyProfession').attr('value', usr.usrCompanyProfession) ;
    })
    //初始化用户和退出按钮
    if(sessionStorage.getItem("emailId")){
        $("#logAcount").empty();
        let str=`<li><a href="/html/accountDetail.html"><span class="glyphicon glyphicon-user"></span> ${emailId}</a></li>`;
        str+=`<li><a href="/html/home.html" onclick="logOut()"><span class="glyphicon glyphicon-log-out"></span> EXIT</a></li>`
        $("#logAcount").append(str);
    }else {
        $('#accountMaster').empty();
        $('#test').empty();
        let str = "<div class='alert alert-info alert-dismissible' role='alert' style='font-size: 20px'>"+
            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
            "<span aria-hidden='true'>&times;</span>"+"</button>"+" ATTENTION&nbsp;!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please log in first</div>";
        $('#test').append(str);

    }

};
function logOut() {
        //退出功能
            sessionStorage.clear();
}
window.addEventListener('DOMContentLoaded',function(){
    document.getElementById("modify").addEventListener('click',function(){
        let password = document.getElementById("detailPassword").value;
        let confirmPw = document.getElementById("detailConfirmPassword").value;
        let currentPw = document.getElementById("detailCurrentPassword").value;
        let oneUser = [{}];
        oneUser[0].usrPassword= document.getElementById("detailConfirmPassword").value;
        oneUser[0].usrCompanyName= document.getElementById("detailCompanyName").value;
        oneUser[0].usrCompanyAddress= document.getElementById("detailCompanyAddress").value;
        oneUser[0].usrCompanyProfession= document.getElementById("detailCompanyProfession").value;
        var judge = false;
        $.get(`/users/${emailId}`,function(user,status){
            //console.log(user.usrPassword);
           // console.log(currentPw);
            if(user.usrPassword!==currentPw){
                judge = false;
            }else{
                judge = true;
            }
            //console.log(judge);
            modify(password,confirmPw,oneUser,judge);
        });
        function modify(password,confirmPw,oneUser,judge){
            //alert(judge);
            if(password==confirmPw&&judge==true){
                $.post(`/users/${emailId}`,oneUser[0],function(){
                    // alert(JSON.stringify(oneUser));
                    // console.log(status);
                });
                $('#test').empty();
                let str = "<div class='alert alert-success alert-dismissible' role='alert'>"+
                    "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                    "<span aria-hidden='true'>&times;</span>"+"</button>"+"SUCCESS&nbsp;!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Modify successfully</div>";
                $('#test').append(str);
            }else{
                $('#test').empty()
                let str = "<div class='alert alert-danger alert-dismissible' role='alert'>"+
                    "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                    "<span aria-hidden='true'>&times;</span>"+"</button>"+" WARNING&nbsp;!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password error</div>";
                $('#test').append(str);
            }
        }

    },false);
});
