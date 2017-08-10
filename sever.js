'use strict';
const express =require('express');
const orm=require('orm');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(orm.express("sqlite:/home/shijie/桌面/girlclub/codingGirlsClub/CodingGirlsClub.db", {
    define: function (db, models, next) {
        models.user = db.define("USERS", {
            id: {type: 'number'},
            usrName : {type: 'text'},
            usrPassword : {type: 'text'},
            usrEmail : {type: 'text'},
            usrCompanyName : {type: 'text'},
            usrCompanyAddress : {type: 'text'},
            usrCompanyProfession: {type: 'text'}
        });
        models.positions=db.define("POSITIONS",{
            id:  {type: 'number'},
            title:  {type: 'text'},
            company:  {type: 'text'},
            description:  {type: 'text'},
            applyMethod : {type: 'text'},
            expiryDate : {type: 'text'},
            category : {type: 'text'},
            jobType : {type: 'text'},
            tags : {type: 'text'},
            city : {type: 'text'},
            country: {type: 'text'},
            condition:  {type: 'text'},
            owner: {type: 'text'},
            publishTime: {type: 'text'},
            invalidTime: {type: 'text'}
        });
        next();
    }
}));

app.get("/positions/id",function (req,res) {
    var getInfo = req.query.Id;
    if(getInfo===''){
        req.models.positions.find(null,function (err,position) {
            res.json(position);
        })
    }
    else {
        req.models.positions.find({Id:getInfo},function (err,position) {
            res.json(position);
        })
    }
});

app.get("/users/emailId",function (req,res) {
    var getInfo = req.query.emailId;
    if(getInfo===''){
        req.models.user.find(null,function (err,usr) {
            res.json(usr);
        })
    }
    else{
        req.models.user.find({usrEmail:getInfo},function (err,usr) {
            res.json(usr);
        })
    }
});

app.listen(3000,function () {
    console.log("This");
});