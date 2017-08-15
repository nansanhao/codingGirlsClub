"use strict";
let pagePositionNum=6;
//进网页检测登录状态
window.onload=function () {
    if(sessionStorage.getItem("emailId")){
        let emailId = sessionStorage.getItem("emailId");
        $("#logAcount").empty();
        let str=`<li><a href="/html/accountDetail.html"><span class="glyphicon glyphicon-user"></span> ${emailId}</a></li>`;
        str+=`<li><a href="" id="LOGOUT"><span class="glyphicon glyphicon-log-out"></span> EXIT</a></li>`
        $("#logAcount").append(str);
    }else {
        $('#test').empty();
        let str = "<div class='alert alert-info alert-dismissible' role='alert' style='font-size: 20px'>"+
            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
            "<span aria-hidden='true'>&times;</span>"+"</button>"+" ATTENTION&nbsp;!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please log in first;</div>";
        $('#test').append(str);
    }
}
$(document).ready(function(){
    //sessionStorage.setItem("emailId","1490165179@qq.com");
    let emailId=sessionStorage.getItem("emailId");
   $.get(`/usrs/${emailId}/positions`,function (ans) {
       //页面初始化
       let positions=cutPage(ans,pagePositionNum);
       appendPositions(1,'showPositions',positions);
       addPagination(1,positions);
       console.log(JSON.stringify(positions))

    });
    //分页功能
    $(document).click(function(e) {
        $.get(`/usrs/${emailId}/positions`,function (ans) {
            //退出功能
            if(/LOGOUT/.test($(e.target).attr("id"))==true){
                sessionStorage.clear();
                $("#logAcount").empty();
                $(location).attr('href','/html/home.html');

            }
            if(/pageBtn/.test($(e.target).attr("id"))==true){
                //alert(JSON.stringify(ans));
                //筛选框的判定
                let positions=cutPage(ans,pagePositionNum);
                $("#showPositions").empty();
                appendPositions($(e.target).attr("id").match(/\d+/g)[0],'showPositions',positions);
                $("#pagebtn").empty();
                addPagination($(e.target).attr("id").match(/\d+/g)[0],positions);
            }
        });


    })
});
//分页（分成数组[[第一页的所有职位]，[第二页的所有职位]，[第三页的所有职位]]）pagePositionNum是全局变量，代表每页的职位数量
function cutPage(positions,pagePositionNum) {
    let result=[];
    let temp=[];
    for(let i=0;i<positions.length;i++){
        temp.push(positions[i]);
        if((i+1)%pagePositionNum==0){
            result.push(temp);
            temp=[];
        }
    }
    if(temp.length>0){
        result.push(temp);
    }

    return result;
}
//把某一页的所有内容加入HTML，page是某页的页数，id是html上某个元素的id
function appendPositions(page,Id,positions) {
    if(positions.length!=0){
        let temp=positions[page-1];
        for(let i=0;i<temp.length;i++){
            positionToHtml(temp[i],Id);
        }
    }


}
//把某个position加入html，htmlId是html上某个元素的id
function positionToHtml(position,htmlId) {
    let positionStr=`<div class="col-md-3 position" >
        <h2><span class="glyphicon glyphicon-bookmark"></span> ${position.title}</h2>
        <h4 class="position-h">${position.country} ${position.city}</h4>
        <h4 class="position-h">${position.condition}</h4>
        <a href="/html/workDetail.html?emailId=${sessionStorage.getItem("emailId")}&Id=${position.id}" class="position-a"><span class="glyphicon glyphicon-hand-right"></span> Know More</a>
    </div>`
    $(`#${htmlId}`).append(positionStr)
}
function addPagination(page, positions) {
    if(positions.length!=0){
        if(positions.length==1){
            let pageStr=`<ul class="pagination">
             <li class="disabled"><a href="#" >&laquo;</a></li>`
            for (let i=0;i<positions.length;i++){
                if(i==page-1){
                    pageStr+=`<li class="active"><a href="#" id="pageBtn${i+1}">${i+1}</a></li>`
                }else {
                    pageStr+=`<li><a href="#" id="pageBtn${i+1}">${i+1}</a></li>`
                }
            }
            pageStr+=`<li class="disabled"><a href="#" >&raquo;</a></li></ul>`;
            $("#pagebtn").append(pageStr);
        }else {
            if(page==1){
                let pageStr=`<ul class="pagination">
             <li class="disabled"><a href="#" >&laquo;</a></li>`
                for (let i=0;i<positions.length;i++){
                    if(i==page-1){
                        pageStr+=`<li class="active"><a href="#" id="pageBtn${i+1}">${i+1}</a></li>`
                    }else {
                        pageStr+=`<li><a href="#" id="pageBtn${i+1}">${i+1}</a></li>`
                    }
                }
                pageStr+=`<li><a href="#" id="pageBtn${Number(page)+1}">&raquo;</a></li></ul>`;
                $("#pagebtn").append(pageStr);
            }
            else if(page==positions.length){
                let pageStr=`<ul class="pagination">
             <li><a href="#" id="pageBtn${page-1}">&laquo;</a></li>`
                for (let i=0;i<positions.length;i++){
                    if(i==page-1){
                        pageStr+=`<li class="active"><a href="#" id="pageBtn${i+1}">${i+1}</a></li>`
                    }else {
                        pageStr+=`<li><a href="#" id="pageBtn${i+1}">${i+1}</a></li>`
                    }
                }
                pageStr+=`<li class="disabled"><a href="#" >&raquo;</a></li></ul>`;
                $("#pagebtn").append(pageStr);
            }else {
                let pageStr=`<ul class="pagination">
             <li><a href="#" id="pageBtn${page-1}">&laquo;</a></li>`
                for (let i=0;i<positions.length;i++){
                    if(i==page-1){
                        pageStr+=`<li class="active"><a href="#" id="pageBtn${i+1}">${i+1}</a></li>`
                    }else {
                        pageStr+=`<li><a href="#" id="pageBtn${i+1}">${i+1}</a></li>`
                    }
                }
                pageStr+=`<li><a href="#" id="pageBtn${Number(page)+1}">&raquo;</a></li></ul>`;
                $("#pagebtn").append(pageStr);
            }
        }
    }
}
