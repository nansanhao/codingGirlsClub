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

//API

//显示主页面
app.get('/',function (req,res) {
    res.sendFile(__dirname+"/public/html/home.html")
});
//1.GET 获得所有职位或者筛选过的职位（返回一个职位JOSN对象数组）（注意，数组转化为JOSN对象，而不是数组里的职位对象转化为JOSON对象放入数组，下同）
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
//2.GET 获得title符合的职位（返回一个职位JOSN对象数组）（模糊搜索）前端要传值homeSearch（根据搜索框输入的信息查询）
app.get("/positions/search",function(req,res){
    let getRequire = req.query.homeSearch;
    if(getRequire!=null){
        req.models.Position.find({or:[{title: getRequire},{company: getRequire},
            {category: getRequire},{city: getRequire},{country: getRequire},
            {tags: getRequire},{id: getRequire},
            {jobType: getRequire}]},function (err,positions) {
            res.json(positions);
            console.log(positions[0].id);
        });
    }
    else{
        req.models.Position.find(null,function (err,positions) {
            res.json(positions);
            console.log(positions[0].id);
        });
    }
});
//3.GET 根据职位id唯一查询一个职位(返回一个职位JOSN对象)
app.get("/positions/:id",function (req,res) {
    var getInfo = req.params.id;
    if(getInfo===''){
        req.models.Position.find(null,function (err,position) {
            res.json(position);
        })
    }
    else {
        req.models.Position.find({id:getInfo},function (err,position) {
            res.json(position);
        })
    }
});
//4.GET 根据邮箱id获得一个用户（返回一个用户JOSN对象）
app.get("/users/:emailId",function (req,res) {
    var getInfo = req.params.emailId;
    if(getInfo===''){
        req.models.User.find(null,function (err,usr) {
            res.json(usr);
        })
    }
    else{
        req.models.User.find({usrEmail:getInfo},function (err,usr) {
            res.json(usr);
        })
    }
});
//5.POST  注册一个新用户(接收一个用户JSON对像)
app.post("/users",function (req,res) {
    var newRecord={};
    var countx=0;
    req.models.User.count(null,function(err,edcount){
        countx=edcount;
        console.log(edcount);
        newRecord.id=countx+1;
        newRecord.usrPassword=req.body.signConfirmPassword;
        req.models.User.create(newRecord,function(err,re){
            if(err)  return res.status(500).json({error:err});
            console.log("ok");
        })

    })


});
//6.PUT 修改一个用户的用户信息(接受一个用户JSON对象)
app.put("/users/:emailID",function (req,res) {


    req.models.User.find({usrEmail:req.params.emailID},function (err,user) {
        if(err) return res.status(500).json({error:err.message})

        user[0].usrpassword=req.body.detailPassword;
        user[0].CompanyName=req.body.detailCompanyName;
        user[0].usrCompanyAddress=req.body.detailCompanyAddress;
        user[0].usrCompanyProfession=req.body.detailCompanyProfession;

        user[0].save(function (err) {
            if(err) return res.status(500).json({error:err.message})
            res.json({message:"用户更新成功"})

        })
    })
});
//7.GET 获得一个用户创建的已发表职位（返回一个职位JOSN对象数组）
app.get('/usrs/:emailId/positions/public',function(req,res){
    let email = req.params.emailId;
    let State = "public";
    console.log(email);
    req.models.Position.find({owner:email,condition:State},function(err,position){
        console.log(JSON.stringify(position));
        res.json(position);
    })
});

//8.GET 获得一个用户创建的未发表职位（返回一个职位JOSN对象数组）
app.get('/usrs/:emailId/positions/hidden',function(req,res){
    let email = req.params.emailId;
    let State = "hidden";
    console.log(email);
    req.models.Position.find({owner:email,condition:State},function(err,position){
        console.log(JSON.stringify(position));
        res.json(position);
    })
});

//9.POST 一个用户新建一个职位。（接收一个职位JOSN对象）
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
//10.PUT 一个用户修改‪一个职位的信息（接收一个职位JOSN对象）

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

//11.GET 一个用户获得‪一个职位的信息（返回一个职位JOSN对象）
app.get('/usrs/:emailId/positions/:id',function (req,res) {
    let email=req.params.emailId;
    let positionId=req.params.id;
    console.log(email);
    console.log(positionId);
    req.models.Position.find({owner:email,id:positionId},function (err,position) {
        console.log(JSON.stringify(position));
        res.json(position);
    })
});

//服务器
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
