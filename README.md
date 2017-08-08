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
    usrCompanyProfession VARCHAR(50),
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
    owner VARCHAR(20),
    publishTime VARCHAR(20),
    invalidTime VARCHAR(20),
)
```

