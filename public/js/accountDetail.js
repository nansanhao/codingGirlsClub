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
        let password = document.getElementById("detailPassword").value;
        let confirmPw = document.getElementById("detailConfirmPassword").value;
        let currentPw = document.getElementById("detailCurrentPassword").value;
        if(password==confirmPw&&currentPw!=''){
            let oneUser = [{}];
            oneUser[0].usrPassword= document.getElementById("detailConfirmPassword").value;
            oneUser[0].usrCompanyName= document.getElementById("detailCompanyName").value;
            oneUser[0].usrCompanyAddress= document.getElementById("detailCompanyAddress").value;
            oneUser[0].usrCompanyProfession= document.getElementById("detailCompanyProfession").value;
            $.post('/users/389746614@qq.com',oneUser[0],function(){
                // alert(JSON.stringify(oneUser));
                // console.log(status);
            });
            $('#test').append('添加成功');
        }else{
            let str = "<div class='alert alert-warning alert-dismissible' role='alert'>"+
                "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                "<span aria-hidden='true'>&times;</span>"+"</button>"+" 密码输入错误，请重试！</div>";
            $('#test').append(str);
        }
    },false);
});
