var _ = require('lodash');
var nodemailer = require('nodemailer');

var config = {
    host: 'smtp.163.com',
    port: 465,
    secureConnection: true,
    auth: {
        user: 'm13720362902@163.com',
        pass: '1998521zrr'
    }
};

var transporter = nodemailer.createTransport(config);

var defaultMail = {
    from: 'thoughtworks<m13720362902@163.com>',
    text: 'test text',
};

module.exports = function(mail){
    // 应用默认配置
    mail = _.merge({}, defaultMail, mail);

    // 发送邮件
    transporter.sendMail(mail, function(error, info){
        if(error) return console.log(error);
        console.log('mail sent:', info.response);
    });
};