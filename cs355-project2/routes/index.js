var express = require('express');
var router = express.Router();
var userDal = require('../dal/user_dal');
/* GET home page. */

router.get('/', function(req, res, next) {
    if(req.session.account === undefined) {
        res.render('index');
    }
    else {
        var data = { firstname : req.session.account.Fname };
        res.render('index', data);
    }
});

router.get('/authenticate', function(req, res) {
    userDal.GetByEmail(req.query.email, function (err, account) {
        if (err) {
            res.render('authentication/login.ejs', { msg: err});
        }
        else if (account == null) {
            res.render('authentication/login.ejs', { msg: "User not found."});
        }
        else if (account.password != req.query.password)
            res.render('authentication/login.ejs', {msg: "Passwords do not match."});
        else {
            req.session.account = account;
            res.render('authentication/success.ejs');
        }
    });
});

router.get('/login', function(req, res) {
    res.render('authentication/login.ejs');
});

router.get('/signup', function(req, res) {
    res.render('authentication/signup.ejs');
})

router.get('/logout', function(req, res) {
    req.session.destroy( function(err) {
        res.render('authentication/logout.ejs');
    });
});

router.get('/save', function(req, res, next) {
    console.log("firstname equals: " + req.query.firstname);
    console.log("the lastname submitted was: " + req.query.lastname);
    console.log("the email submitted was: " + req.query.email);
    console.log("the password submitted was: " + req.query.password);

    userDal.Insert(req.query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});

router.get('/about', function(req, res) {
    res.render('about.ejs');
});

module.exports = router;