'use strict';
let express =require('express');
let orm=require('orm');
let bodyparser=require("body-parser");
let app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(orm.express("sqlite:public/CodingGirlsClub.db",{
    define:function (db,models,next) {
        models.Position=db.define("POSITIONS",{
            id:{type:'number'},
            title:{type:'text'},
            company:{type:'text'},
            description:{type:'text'},
            applyMethod:{type:'text'},
            expiryDate:{type:'text'},
            category:{type:'text'},
            jobType:{type:'text'},
            tags:{type:'text'},
            city:{type:'text'},
            country:{type:'text'},
            condition:{type:'text'},
            owner:{type:'number'},
            publishTime:{type:'text'},
            invalidTime:{type:'text'}
        });
        models.User=db.define("USERS",{
            id:{type:'number'},
            usrName:{type:'text'},
            usrPassword:{type:'text'},
            usrEmail:{type:'text'},
            usrCompanyName:{type:'text'},
            usrCompanyAddress:{type:'text'},
            usrCompanyProfession:{type:'text'}
        });
        next();
    }
}));
//此处写API

//7 ORM EDITION
app.get('/usrs/:emailId/positions/public',function(req,res){
    let email = req.params.emailId;
    let State = "public";
    console.log(email);
    req.models.Position.find({owner:email,condition:State},function(err,position){
        console.log(JSON.stringify(position));
        res.json(position);
    })
});
//8 ORM EDITION
app.get('/usrs/:emailId/positions/hidden',function(req,res){
    let email = req.params.emailId;
    let State = "hidden";
    console.log(email);
    req.models.Position.find({owner:email,condition:State},function(err,position){
        console.log(JSON.stringify(position));
        res.json(position);
    })
});