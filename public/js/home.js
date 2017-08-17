
// window.onload=function () {
//     //alert("sss")
//     if(sessionStorage.getItem("emailId")){
//         let emailId = sessionStorage.getItem("emailId");
//         $("#logAcount").empty();
//         let str=`<li><a href="/html/accountDetail.html"><span class="glyphicon glyphicon-user"></span> ${emailId}</a></li>`;
//         str+=`<li><a href="" id="LOGOUT"><span class="glyphicon glyphicon-log-out"></span> EXIT</a></li>`
//         $("#logAcount").append(str);
//     }
// }


//每页职位的个数（全局变量）
let pagePositionNum=6;
$(document).ready(function () {

    //页面初始化
    $.get('/positions',function (ans) {
        let positions=cutPage(ans,pagePositionNum);
        appendPositions(1,'showPositions',positions);
        addPagination(1,positions);
        //console.log(JSON.stringify(positions))
    })
    //搜索功能
    $("#homeSearchBtn").on('click',function () {
        if($("#homeSearch").val()!=null){
            $.get(`/positions/search?homeSearch=${$("#homeSearch").val()}`,function (ans) {
                //console.log(ans);
                document.getElementById("characters").options.selectedIndex = 0; //回到初始状态
                $("#characters").selectpicker('refresh');//对searchPayState这个下拉框进行重置刷
                document.getElementById("positions").options.selectedIndex = 0; //回到初始状态
                $("#positions").selectpicker('refresh');//对searchPayState这个下拉框进行重置刷
                let positions=cutPage(ans,pagePositionNum);
                $("#showPositions").empty();
                appendPositions(1,'showPositions',positions);
                $("#pagebtn").empty();
                addPagination(1,positions);
            });
        }
    });
    //characters筛选功能
    $("#characters").change(function(){
            $.get(`/positions/search?homeSearch=${$("#homeSearch").val()}`,function (ans) {
                //console.log(ans);
                //筛选框的判定
                if($("#characters").find("option:selected").text()=="No Select"&&$("#positions").find("option:selected").text()!="No Select"){
                    for(let i=ans.length-1;i>=0;i--){
                        if(ans[i].jobType!=$("#positions").find("option:selected").text()){
                            ans.splice(i,1);
                        }
                    }
                }
                else if($("#positions").find("option:selected").text()=="No Select"&&$("#characters").find("option:selected").text()!="No Select"){
                    for(let i=ans.length-1;i>=0;i--){
                        if((ans[i].category!=$("#characters").find("option:selected").text())){
                            ans.splice(i,1);
                        }
                    }
                }else if($("#positions").find("option:selected").text()!="No Select"&&$("#characters").find("option:selected").text()!="No Select"){
                    for(let i=ans.length-1;i>=0;i--){
                        if(ans[i].category!=$("#characters").find("option:selected").text()||ans[i].jobType!=$("#positions").find("option:selected").text()){
                            ans.splice(i,1);
                        }
                    }
                }
                let positions=cutPage(ans,pagePositionNum);
                $("#showPositions").empty();
                appendPositions(1,'showPositions',positions);
                $("#pagebtn").empty();
                addPagination(1,positions);
            });
    });
    //positions筛选功能
    $("#positions").change(function(){
        $.get(`/positions/search?homeSearch=${$("#homeSearch").val()}`,function (ans) {
            //console.log(ans);
            //筛选框的判定
            if($("#characters").find("option:selected").text()=="No Select"&&$("#positions").find("option:selected").text()!="No Select"){
                for(let i=ans.length-1;i>=0;i--){
                    if(ans[i].jobType!=$("#positions").find("option:selected").text()){
                        ans.splice(i,1);
                    }
                }
            }
            else if($("#positions").find("option:selected").text()=="No Select"&&$("#characters").find("option:selected").text()!="No Select"){
                for(let i=ans.length-1;i>=0;i--){
                    if((ans[i].category!=$("#characters").find("option:selected").text())){
                        ans.splice(i,1);
                    }
                }
            }else if($("#positions").find("option:selected").text()!="No Select"&&$("#characters").find("option:selected").text()!="No Select"){
                for(let i=ans.length-1;i>=0;i--){
                    if(ans[i].category!=$("#characters").find("option:selected").text()||ans[i].jobType!=$("#positions").find("option:selected").text()){
                        ans.splice(i,1);
                    }
                }
            }
            let positions=cutPage(ans,pagePositionNum);
            $("#showPositions").empty();
            appendPositions(1,'showPositions',positions);
            $("#pagebtn").empty();
            addPagination(1,positions);
        });
    });
    //分页功能
    $(document).click(function(e) {
        $.get(`/positions/search?homeSearch=${$("#homeSearch").val()}`,function (ans) {
            //退出功能
            if(/LOGOUT/.test($(e.target).attr("id"))==true){
                sessionStorage.clear();
                $("#logAcount").empty();
                let str=`<ul class="nav navbar-nav navbar-right " id="logAcount">
            <li><a href="/html/signIn.html"><span class="glyphicon glyphicon-user"></span> REGISTER</a></li>
            <li><a href="/html/login.html"><span class="glyphicon glyphicon-log-in"></span> SIGN IN</a></li>
        </ul>`
                $("#logAcount").append(str);
            }
            if(/pageBtn/.test($(e.target).attr("id"))==true){
                //alert(JSON.stringify(ans));
                //筛选框的判定
                if($("#characters").find("option:selected").text()=="No Select"&&$("#positions").find("option:selected").text()!="No Select"){
                    for(let i=ans.length-1;i>=0;i--){
                        if(ans[i].jobType!=$("#positions").find("option:selected").text()){
                            ans.splice(i,1);
                        }
                    }
                }
                else if($("#positions").find("option:selected").text()=="No Select"&&$("#characters").find("option:selected").text()!="No Select"){
                    for(let i=ans.length-1;i>=0;i--){
                        if((ans[i].category!=$("#characters").find("option:selected").text())){
                            ans.splice(i,1);
                        }
                    }
                }else if($("#positions").find("option:selected").text()!="No Select"&&$("#characters").find("option:selected").text()!="No Select"){
                    for(let i=ans.length-1;i>=0;i--){
                        if(ans[i].category!=$("#characters").find("option:selected").text()||ans[i].jobType!=$("#positions").find("option:selected").text()){
                            ans.splice(i,1);
                        }
                    }
                }
                let positions=cutPage(ans,pagePositionNum);
                $("#showPositions").empty();
                appendPositions($(e.target).attr("id").match(/\d+/g)[0],'showPositions',positions);
                $("#pagebtn").empty();
                addPagination($(e.target).attr("id").match(/\d+/g)[0],positions);
            }
        });


    })
})
//添加分页按钮的函数，page是要添加的那一页的页数
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
    let positionStr=`<div class="col-md-3 position box9" >
        <h2>${position.title}</h2>`;
        let temp=position.tags.split("/");
    for(let i=0;i<temp.length;i++){
        if(i%3==0){
            positionStr+=`  <span class="label label-primary">${temp[i]}</span>`
        }else if(i%3==1){
            positionStr+=`  <span class="label label-success">${temp[i]}</span>`
        }else if(i%3==2){
            positionStr+=`  <span class="label label-danger">${temp[i]}</span>`
        }

    }

        positionStr+=`<h4 class="position-h">${position.country} ${position.city}</h4>
        <h4 class="position-h">${position.category}</h4>
        <h4 class="position-h">${position.jobType}</h4>
        <a href="/html/infoDetail.html?positionId=${position.id}" class="position-a"> CONTINUE..</a>
    </div>`
    $(`#${htmlId}`).append(positionStr)
}
