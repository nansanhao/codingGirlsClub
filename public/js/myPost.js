"use strict";
//进网页检测登录状态
window.onload=function () {
    if(sessionStorage.getItem("emailId")){
        let emailId = sessionStorage.getItem("emailId");
        $("#logAcount").empty();
        let str=`<li><a href="/html/accountDetail.html"><span class="glyphicon glyphicon-user"></span> ${emailId}</a></li>`;
        str+=`<li><a href=""><span class="glyphicon glyphicon-log-out"></span> EXIT</a></li>`
        $("#logAcount").append(str);
    }
}
$(document).ready(function(){
    //sessionStorage.setItem("emailId","1490165179@qq.com");
    let emailId=sessionStorage.getItem("emailId");
   $.get(`/usrs/${emailId}/positions/public`,function (positions) {
       //alert(positions);
       for(let i=0;i<positions.length;i++){
           let str=`<div class="col-md-3 position" id='publicJob${i}'>
        <h2><span class="glyphicon glyphicon-bookmark"></span>${positions[i].jobType}</h2>
        <h4 class="position-h">${positions[i].country}</h4>
        <h4 class="position-h">${positions[i].city}</h4>
        <a href="/html/infoDetail.html?positionId=${positions[i].id}" class="position-a"><span class="glyphicon glyphicon-hand-right"></span> Know more</a >
    </div>`
           $('#publicPositions').append(str);
       }
   });
    $.get(`/usrs/${emailId}/positions/hidden`,function (positions) {
        //alert(positions);
        for(let i=0;i<positions.length;i++){
            let str=`<div class="col-md-3 position" id='hiddenJob${i}'>
        <h2><span class="glyphicon glyphicon-bookmark"></span>${positions[i].jobType}</h2>
        <h4 class="position-h">${positions[i].country}</h4>
        <h4 class="position-h">${positions[i].city}</h4>
        <a href="/html/infoDetail.html?positionId=${positions[i].id}" class="position-a"><span class="glyphicon glyphicon-hand-right"></span> Know more</a >
    </div>`
            $('#hiddenPositions').append(str);
        }
    });
});
