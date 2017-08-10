# codingGirlsClub
## 一．HTML ID设计

### 1. 导航:
* 登录/登出：**id=logAcount**
* 导航栏：**id=navigation**
* 导航栏：ALL JOBS 、POST A JOB 、MY POSTS 、ACCOUNT、SIGN IN

### 2. 主页 home.html:

* 搜索框：**id=homeSearch**
* 工作性质过滤器：**id=characters**  
  下拉菜单选择：**id=volunteer,id=permanent,id=freelance,id=contract**
* 工作职位过滤器：**id=positions**   
  下拉菜单选择：**id=development,id=designer,id=marketing,id=productManager,id=others**
* 显示工作职位的div：**id=showPositions**,页面显示的每个职位的div的id为position(1-n)

### 3. 工作详细信息页面 infoDetail.html：
* title：**id=homeTitle**
* company：**id=homeCompany**
* description：**id=homeDescription**(支持简单的富文本编辑；如果能再同时支持markdown，会有加分) 
* tags：**id =homeTags**
* how to apply **id=homeApply**(支持简单的富文本编辑；如果能再同时支持markdown，会有加分) 

### 4. 发布职位界面 postJob.html：
* title：**id=postTitle**（必填项）
*  company：**id=postCompany**（必填项）
* description：**id=postDescription**(必填项，支持简单的富文本) 
* how to apply：**id=postApply**（必填项） 
* expiry date：**id =postDate**(必填项，下拉框)
* category：**id= postCategory**(必填项，下拉框) 
* job type：**id=postType**(必填项，下拉框)
* tags：**id=postTags**(非必填)
* city：**id=postCity**(必填项，输入框)
* country：**id=postCountry**(必填项，下拉框，默认China)
* **id=postAddPosition** (有一个创建工作的按钮)

### 5. 工作详情界面 workDetail.html：
* title：**id=title**
* company：**id=company**
* description：**id=description**(支持简单的富文本编辑；如果能再同时支持markdown，会有加分) 
* tags：**id =tags**
* how to apply：**id=apply**(支持简单的富文本编辑；如果能再同时支持markdown，会有加分)
* **id=publish**（有一个发布的按钮）
* **id=edit**（有一个编辑的按钮）

### 6. 编辑工作界面 edit.html：
* title（必填项）：**id=editTitle**
* company（必填项）：**id=editCompany**
* description(必填项，支持简单的富文本) **id=editDescription**
* how to apply（必填项）：**id=editApply**
* expiry date(必填项，下拉框)：**id =editDate**
* category(必填项，下拉框)：**id= editCategory**
* job type(必填项，下拉框)：**id=editType**
* tags(非必填)：**id=editTags**
* city(必填项，输入框)：**id=editCity**
* country(必填项，下拉框，默认China)：**id=editCountry**
* **id=editUpdatePosition**(有一个更新的按钮)

### 7. MY POST 界面myPost.html：
* 已发表的职位列表：**id = publicPositions**
* 未发表的职位列表：**id = hiddenPositions**

### 8. 登录页面 login.html:
* 邮箱：**id = loginEmail**
* 密码：**id = loginPassword**
* 记住密码：**id =rememberPassword**
* 登陆：**id = login**
* 创建账户：**id = loginCreateAccount**
* 忘记密码：**id= loginForgetPassword**

### 9. 注册页面 signIn.html:
* 邮箱：**id = signEmail**
* 密码：**id = signPassword**
* 确认密码：**id = signConfirmPassword**
* 注册：**id= signIn** (大写的i)   

### 10. 忘记密码 forget.html: 
* 邮箱：**id = forgetEmail**
* 重置密码：**id= forgetResetPassword**

### 11. 账户详细界面 accountDetail.html：
* 邮箱：**id=detailEmail**
* 密码：**id = detailPassword**
* 确认密码：**id= detailConfirmPassword**
* 当前密码：**id=detailCurrentPassword**
* 公司名称：**id= detailCompanyName**
* 公司地址：**id= detailCompanyAddress**
* 公司所处行业：**id= detailCompanyProfession**
* 更改按钮：**id= detailChange**
* 注销按钮：**id = detailLogout**

## 二．数据库表单设计
### 1.建立数据库
```
CREATE DATABASE CodingGirlsClub
```
### 2.建立用户表
```
CREATE TABLE USERS(
    id INT PRIMARY KEY,
    usrName VARCHAR(20),
    usrPassword VARCHAR(20),
    usrEmail VARCHAR(50),
    usrCompanyName VARCHAR(30),
    usrCompanyAddress VARCHAR(100),
    usrCompanyProfession VARCHAR(50)
)
```
### 3.建立职位表

```
CREATE TABLE POSITIONS(
    id INT PRIMARY KEY,
    title VARCHAR(20),
    company VARCHAR(30),
    description VARCHAR(100),
    applyMethod VARCHAR(200),
    expiryDate VARCHAR(30),
    category VARCHAR(30),
    jobType VARCHAR(30),
    tags VARCHAR(30),
    city VARCHAR(20),
    country VARCHAR(20),
    condition VARCHAR(20),
    owner int,
    publishTime VARCHAR(20),
    invalidTime VARCHAR(20)
)
```


## 三.后台API设计
1. GET 获得所有职位或者筛选过的职位（返回一个职位JOSN对象数组）（注意，数组转化为JOSN对象，而不是数组里的职位对象转化为JOSON对象放入数组，下同）
```
app.get("/positions",fuction(){
res.send(allPositions)
})
```
当要返回筛选的职位的时候传入category和jobType,即前端为
```
$.get("/positions？category=&jobType=",fuction(ans){
})
```

所以这个api要对有没有传值进行判断，再返回相应值

2. GET 获得title符合的职位（返回一个职位JOSN对象数组）（模糊搜索）前端要传值homeSearch
```
app.get("/positions",fuction(){
res.send(positions)
})
```

3. GET 根据职位id唯一查询一个职位(返回一个职位JOSN对象)
```
app.get("/positions/:id",fuction()
res.send(position)
})
```

4. GET 根据邮箱id获得一个用户（返回一个用户JOSN对象）
```
app.get("/usrs/:emailId",fuction(){
res.send(usr)
})
```

5. POST 注册一个新用户（接收一个用户JOSN对象）
```
app.post("/usrs",fuction{
res.send("ok")
})
```

6. PUT 修改一个用户的用户信息(接收一个用户JOSN对象)
```
app.put("/usrs/:emailId",fuction{
res.send("ok")
})
```

7. GET 获得一个用户创建的已发表职位（返回一个职位JOSN对象数组）
```
app.get("/usrs/:emailId/positions/public",fuction(){
res.send(publicPositions)
})
```

8. GET 获得一个用户创建的未发表职位（返回一个职位JOSN对象数组）
```
app.get("/usrs/:emailId/positions/hidden",fuction(){
res.send(hiddenPositions)
})
```

9. POST 一个用户新建一个职位。（接收一个职位JOSN对象）
```
app.post("/usrs/:emailId/positions",fuction{
res.send("positionId")
})
```

10. PUT 一个用户修改‪一个职位的信息（接收一个职位JOSN对象）
```
app.put("/usrs/:emailId/positions/:id",fuction{
res.send("ok")
})
```

11. GET 一个用户获得‪一个职位的信息（返回一个职位JOSN对象）
```
app.get("/usrs/:emailId/positions/:id",fuction{
res.send(position)
})
```



## 四.前台访问后台API规范

```
$.get("/",fuction(){

})
$.post("/",date,fuction(ans){

})
$.ajax({
url: "ajax/ajax_selectPicType.aspx",
data:{Full:"fu"},
type: "POST",
dataType:'json',
success:CallBack,
error:function(er){
BackErr(er);}
});
```


## 数据库相关知识：
### 这里使用了orm.js来管理SQLite数据库
#### 数据连接
```
//引入orm包
let orm = require('orm');
//设置orm连接
let db = orm.connect('sqlite:movie.db', function(err, db) {
    if (err) {
        return console.error('Connection error: ' + err);
    }else {
        return db;
    }
});
/*
    假设数据库movie.db里面已经有一张表person而且在这张表里面有id和name这两个字段(还可能有多个字段但是不影响取数据)
*/
//定义数据
let Per = db.define("person", {
    id: {type: 'number'},
    name: {type: 'text'}
});
//增加数据
Per.create({
    id : 2,
    name : '老王'
},function (err) {
    if(err){
        console.log(err);
    }
});
/*
    添加的数据
    id = 2
    name = 老王
    注意！这里添加的数据的Key必须与数据库里面的字段对应
*/
//查询数据
Per.find({id:1},function (err,ans) {
    console.log(ans.length);
    console.log(ans[0].name);
});
/*
    输出的数据
    1
    小王
    注意！这里取出的数据ans是一个数组对象
*/
//修改数据
Per.find({id:1},function (err,ans) {
    console.log(ans[0].name);
    ans[0].name = '小李';
    ans[0].save(function (err) {
        if(err){
            console.log(err);
        }
    })
});
/*
    输出的数据
    小王
    注意！执行save函数后如果未抛出异常即数据库person表内id为1的这条数据中的name值有小王更改为小李
*/
//删除数据
Per.find({id:1},function (err,ans) {
    console.log(ans[0].name);
    ans[0].remove(function (err) {
        if(err){
            console.log(err);
        }
    })
});
/*
    注意！执行remove函数后如果未抛出异常即数据库person表内id为1的这条数据从数据库中移除
*/
```
[orm中文文档地址](https://wizardforcel.gitbooks.io/orm2-doc-zh-cn/content/index.html)

[orm官方文档的地址](https://www.npmjs.com/package/orm)
#### 结合express使用orm
```
//引入依赖文件
let express = require('express');
let orm = require('orm');
let app = express();
//express引入数据对象
app.use(orm.express("sqlite:testDB.db", {
    define: function (db, models, next) {
        models.Per = db.define("person", {
            id: {type: 'number'},
            name: {type: 'text'},
            age: {type: 'text'},
            continent: {type: 'text'},
            photo: {type: 'text'}
        });
        //otherTable...
        next();
    }
}));
//数据添加
app.get('/',function (req,res) {
    req.models.Per.create({
        id:1,
        name:"小王"
    },function (err) {
        console.log(err);
    })
});
/*
    用浏览器访问根地址既可以在数据库中添加一条数据
*/
//数据查询
app.get('/',function (req,res) {
    req.models.Per.find({id:1},function (err,ans) {
        res.json(ans[0]);
    })
});
/*
    用浏览器访问根地址返回的数据为
    {"id":1,"name":"小王","age":null,"continent":null,"photo":null}
    可以用axios接收数据进行处理
*/
//修改数据
app.get('/',function (req,res) {
    req.models.Per.find({id:1},function (err,ans) {
        ans[0].name = "小李";
        ans[0].save();
        res.json(ans[0]);
    })
});
/*
    用浏览器访问根地址返回的数据为
    {"id":1,"name":"小李","age":null,"continent":null,"photo":null}
    即数据已经修改
*/
//删除数据
app.get('/',function (req,res) {
    req.models.Per.find({id:1},function (err,ans) {
        ans[0].remove();
    })
});
/*
    用浏览器访问根地址
    查看数据库，数据已经被删除
*/
```

