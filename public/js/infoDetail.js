"use strict";
$(document).ready(function() {
    //切割时要加href，不然没有显示
    let positionId = window.location.href.split("positionId=");
    $.get(`/positions/${positionId[1]}`, function (position) {
        let str = `<tr><td>title</td><td>${position[0].title}</td></tr>
<tr><td>company</td><td>${position[0].company}</td></tr>
<tr><td>description</td><td>${position[0].description}</td></tr>
<tr><td>applyMethod</td><td>${position[0].applyMethod}</td></tr>
<tr><td>expiryDate</td><td>${position[0].expiryDate}</td></tr>
<tr><td>category</td><td>${position[0].category}</td></tr>
<tr><td>jobType</td><td>${position[0].jobType}</td></tr>
<tr><td>tags</td><td>${position[0].tags}</td></tr>
<tr><td>country</td><td>${position[0].country}</td></tr>
<tr><td>city</td><td>${position[0].city}</td></tr>
<tr><td>condition</td><td>${position[0].condition}</td></tr>`;
        $('#tab').append(str);
    })
});