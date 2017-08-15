// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
//var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
//var connection = mysql.createConnection(dbconfig.connection);

//connection.query('USE ' + dbconfig.database);
// expose this function to our app using modles.exports
models.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        let email = req.params.emailId
        /*
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
        */
        req.models.User.find({usrEmail:email},function(err,user){
            res.json(user);
        });
    });

  
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            let email = req.params.emailId;

            req.models.User.find({usrEmail:email},function(err,user){
                if(err)
                    return done(err);
                if(!user.length){
                    return done(null,false,req.flash('loginMessage','Oooooops! No user found.'));
                }
                if(!bcrypt.compareSync(password,user[0].password))
                    return done(null,false,req.flash('loginMessage','Oooooops! Wrong password.'));
                return done(null,user[0]);
            })
        })
    );
};
