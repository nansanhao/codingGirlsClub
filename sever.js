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
//1中获得筛选category和jobType的SQL版本
app.get('/positions?category=&jobType=',urlencodedParser,function (req,res) {
  let jobtype=req.params.jobtype;
  let category=req.params.category;
  //console.log(jobtype,category);
    let sql='SELECT * FROM POSITIONS WHERE category=? AND jobtype=?';
    let sqlinfor=[category,jobtype];
    connection.query(sql,sqlinfor,function (err, result) {
        if(err) throw  err;
        res.send(result);
    });
});

//2 模糊搜索职位
app.get('/positions',urlencodedParser,function(req,res){
    let title = req.body.title;
    let sql = '';
    let sqlinfor=[title];
    connection.query(sql,sqlinfor,function (err,result){
        if(err) throw err;
        res.send(result);
    });
});

//3 根据id查询职位
app.get('/positions',urlencodedParser,function(req,res){
    let id = req.body.id;
    let sql = 'SELECT * FROM POSITIONS WHERE id=?';
    let sqlinfor=[id];
    connection.query(sql,sqlinfor,function (err,result){
        if(err) throw err;
        res.send(result);
    });
});
//4 根据邮箱返回用户信息
app.get('/positions',urlencodedParser,function(req,res){
    let email = req.body.usrEmail;
    let sql = 'SELECT * FROM POSITIONS WHERE email=?';
    let sqlinfor=[usrEmail];
    connection.query(sql,sqlinfor,function (err,result){
        if(err) throw err;
        res.send(result);
    });
});
//5 
//7.GET 获得一个用户创建的已发表职位（返回一个职位JOSN对象数组）
app.get('/usrs/:emailId/positions/public',urlencodedParser,function(req,res){
    let id = req.body.id;
    let sql = 'SELECT * FROM POSITIONS WHERE owner =? AND condition = "public"';
    let sqlinfor=[usrEmail];
    connection.query(sql,sqlinfor,function (err,result){
        if(err) throw err;
        res.send(result);
    });
});
//8.GET 获得一个用户创建的未发表职位（返回一个职位JOSN对象数组）
app.get('/usrs/:emailId/positions/hidden',urlencodedParser,function(req,res){
    let id = req.body.id;
    let sql = 'SELECT * FROM POSITIONS WHERE owner =? AND condition = "hidden"';
    let sqlinfor=[usrEmail];
    connection.query(sql,sqlinfor,function (err,result){
        if(err) throw err;
        res.send(result);
    });
});


var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});
