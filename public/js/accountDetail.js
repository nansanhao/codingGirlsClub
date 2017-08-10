'use strict';
window.onload = function(){
    $.get('/users/emailId?emailId=1490165179@qq.com',function (usr,status){
        console.log(JSON.stringify(usr));
        console.log(usr[0].id);
        console.log(usr[0].usrCompanyAddress);
        $('#detailEmail').attr('value', usr[0].usrEmail) ;
        $('#detailCurrentPassword').attr('value', usr[0].usrPassword) ;
        $('#detailCompanyName').attr('value', usr[0].usrCompanyName) ;
        $('#detailCompanyAddress').attr('value', usr[0].usrCompanyAddress) ;
        $('#detailCompanyProfession').attr('value', usr[0].usrCompanyProfession) ;
    })
};
ducument.getElementById("modify").click(function(){
    $.get('/movies', function(movies,status){
        // alert(status);
        // alert(JSON.stringify(movies));
        let i =0;
        // i =Math.floor(Math.random()*5);
        for(i;i<12;i++){
            let s = `#mov${i}`;
            let name = `#movName${i}`
            $(s).attr('src', movies[i].image);
            $(name).append(movies[i].name);
        }
        $('#mov12').attr('src', movies[1].image) ;
        $('#movName12').append(movies[1].name);
    });
});