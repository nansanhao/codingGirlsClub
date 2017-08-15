'use strict';
window.onload = function(){
    $.get('/users/389746614@qq.com',function (usr,status){
        console.log(JSON.stringify(usr));
        console.log(usr[0].id);
        console.log(usr[0].usrCompanyAddress);
        $('#detailEmail').attr('value', usr[0].usrEmail) ;
        // $('#detailCurrentPassword').attr('value', usr[0].usrPassword) ;
        $('#detailCompanyName').attr('value', usr[0].usrCompanyName) ;
        $('#detailCompanyAddress').attr('value', usr[0].usrCompanyAddress) ;
        $('#detailCompanyProfession').attr('value', usr[0].usrCompanyProfession) ;
    })
};
window.addEventListener('DOMContentLoaded',function(){
    document.getElementById("modify").addEventListener('click',function(){
        $('#test').empty();
        let password = document.getElementById("detailPassword").value;
        let confirmPw = document.getElementById("detailConfirmPassword").value;
        let currentPw = document.getElementById("detailCurrentPassword").value;
        let oneUser = [{}];
        oneUser[0].usrPassword= document.getElementById("detailConfirmPassword").value;
        oneUser[0].usrCompanyName= document.getElementById("detailCompanyName").value;
        oneUser[0].usrCompanyAddress= document.getElementById("detailCompanyAddress").value;
        oneUser[0].usrCompanyProfession= document.getElementById("detailCompanyProfession").value;
        var judge = false;
        $.get('/users/389746614@qq.com',function(user,status){
            console.log(user[0].usrPassword);
            console.log(currentPw);
            if(user[0].usrPassword!==currentPw){
                judge = false;
            }else{
                judge = true;
            }
            console.log(judge);
            modify(password,confirmPw,oneUser,judge);
        });
        function modify(password,confirmPw,oneUser,judge){
            alert(judge);
            if(password==confirmPw&&judge==true){
                $.post('/users/389746614@qq.com',oneUser[0],function(){
                    // alert(JSON.stringify(oneUser));
                    // console.log(status);
                });
                $('#test').append('修改成功');
            }else{
                let str = "<div class='alert alert-warning alert-dismissible' role='alert'>"+
                    "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                    "<span aria-hidden='true'>&times;</span>"+"</button>"+" 密码输入错误，请重试！</div>";
                $('#test').append(str);
            }
        }

    },false);
});
