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
            owner:{type:'text'},
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
app.get('/',function (req,res) {
    res.sendFile(__dirname+"/public/html/home.html")
})
app.put('/usrs/:emailId/positions/:id',function (req,res) {
    //检测数据是否取到
    let email=req.params.emailId;
    let positionId=req.params.id;
    console.log(email);
    console.log(positionId);
    req.models.Position.find({owner:email,id:positionId},function (err,position){
        position[0].remove(function (err) {
            if(err){
                console.log("错误");
            }
        });
        var newRecord={};
        newRecord.id=req.body.id;
        newRecord.title=req.body.title;
        newRecord.company=req.body.company;
        newRecord.description=req.body.description;
        newRecord.applyMethod=req.body.applyMethod;
        newRecord.expiryDate=req.body.expiryDate;
        newRecord.category=req.body.category;
        newRecord.jobType=req.body.jobType;
        newRecord.tags=req.body.tags;
        newRecord.city=req.body.city;
        newRecord.country=req.body.country;
        newRecord.condition=req.body.condition;
        newRecord.owner=req.body.owner;
        newRecord.publishTime=req.body.publishTime;
        newRecord.invalidTime=req.body.invalidTime;
        req.models.Position.create(newRecord,function(err,result){
            console.log(JSON.stringify(newRecord));
            console.log("修改成功");
        });
        //测试用例
        // req.models.Position.find({id:1001},function (err,ans) {
        //     console.log(JSON.stringify(ans));
        // })
    });
});
app.get('/usrs/:emailId/positions/:id',function (req,res) {
    let email=req.params.emailId;
    let positionId=req.params.id;
    console.log(email);
    console.log(positionId);
    req.models.Position.find({owner:email,id:positionId},function (err,position) {
        console.log(JSON.stringify(position));
        res.json(position);
    })
})
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
