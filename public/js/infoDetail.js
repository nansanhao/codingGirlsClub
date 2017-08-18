"use strict";
window.onload=function () {
    if(sessionStorage.getItem("emailId")){
        let emailId = sessionStorage.getItem("emailId");
        $("#logAcount").empty();
        let str=`<li><a href="/html/accountDetail.html"><span class="glyphicon glyphicon-user"></span> ${emailId}</a></li>`;
        str+=`<li><a href="/html/home.html" onclick="sessionStorage.clear()" id="LOGOUT"><span class="glyphicon glyphicon-log-out"></span> EXIT</a></li>`
        $("#logAcount").append(str);
    }
}
$(document).ready(function() {
    //切割时要加href，不然没有显示

    let positionId = window.location.href.split("positionId=");
    $.get(`/positions/${positionId[1]}`, function (ans) {
        let position=ans[0];
        let str = `<h1>${position.title} <small style="color: #209b60;">TO  ${position.expiryDate}</small></h1><br>`
        let temp=position.tags.split("/");
        for(let i=0;i<temp.length;i++){
            if(i%3==0){
                str+=`  <span class="label label-primary">${temp[i]}</span>`
            }else if(i%3==1){
                str+=`  <span class="label label-warning">${temp[i]}</span>`
            }else if(i%3==2){
                str+=`  <span class="label label-danger">${temp[i]}</span>`
            }

        }

        str+=` <span class="label label-primary"> ${position.jobType} </span>&nbsp; <span class="label label-success"> ${position.category}</span><br><br>
                    <h2>${position.country}  ${position.city}</h2>
                    <br><br>
                    <h4>招聘公司：${position.company}</h4>
                    <br><br>
                    <h4>求职过程：${position.applyMethod}</h4>
                    <br><br>
                
                        <blockquote style=" font-size: 18px">
                            ${position.description}
                        </blockquote>
                </div>`;
        //alert(str)
        $('#infoDetail').append(str);
    })
});