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


//获得所有的职位信息，并以json格式发送。
app.get("/position",function(req,res){
    req.models.Position.find(null,function (err,allPositions) {
        res.json(allPositions);
    });
})
//根据职位性质和职位筛选获得满足条件的职位信息。前端在选定一个具体的职位和性质后需要把路由改为/positions?category=&jobType=
app.get("/positions",function(req,res){
    let getCategory = req.query.category;
    let getJobType = req.query.jobType;
    if(getCategory!=null&&getJobType!=null){
        req.models.Position.find({category:getCategory},{jobType:getJobType},function (err,allPositions) {
            res.json(allPositions);
        });
    }else if(getCategory==null&&getJobType!=null){
        req.models.Position.find({jobType:getJobType},function (err,allPositions) {
            res.json(allPositions);
        });
    }else if(getCategory!=null&&getJobType==null){
        req.models.Position.find({category:getCategory},function (err,allPositions) {
            res.json(allPositions);
        });
    }else{
        req.models.Position.find(null,function (err,allPositions) {
            res.json(allPositions);
        });
    }

});
//根据搜索框输入的信息查询符合条件的职位。
app.get("/positions/search",function(req,res){
    let getRequire = req.body.homeSearch;
    if(getRequire!=null){
        req.models.Position.find({or:[{title:getRequire},{company:getRequire},
            {category:getRequire},{city:getRequire},{country:getRequire},
            {jobType:getRequire}]},function (err,positions) {
            res.json(positions);
            console.log(positions[0].id);
        });
    }else{
        req.models.Position.find(null,function (err,positions) {
            res.json(positions);
            console.log(positions[0].id);
        });
    }
})
//POST 一个用户新建一个职位。（接收一个职位JSON对象）
app.post("/usrs/:emailId/positions",function(req,res){
    let email = req.params.emailId;
    req.models.Position.count(null,function(err,count){
        console.log(count);
        req.models.Position.create({
            id: count+1001,
            title: req.body.editTitle,
            company: req.body.editCompany,
            description: req.body.editDescription,
            applyMethod: req.body.editApply,
            expiryDate: req.body.editDate,
            category: req.body.editCategory,
            jobType: req.body.editType,
            tags: req.body.editTags,
            city: req.body.editCity,
            country: req.body.editCountry,
            condition: 'hidden',
            owner: email
        },function(err,reply){
            if(err){
                console.log(err)
            }else{
                console.log('添加成功');
            }

        });
    });
});



