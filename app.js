var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var fs = require('fs');
var http = require('http');
const { endianness } = require('os');
const { Router } = require('express');
var port = 3000;

var app = express();

app.use(cors());
var mongoclient = require('mongodb').MongoClient;
var connectionString = "mongodb://127.0.0.1:27017";
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopoLogy: true
});
var db = mongoose.connection;
db.on('error', function () {
    console.log("error in connecting to database");
    db.once('open', function () {
        console.log("connected database");
    });
})
//inserting data process in code
app.post("/signup", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "phone": phone,
        "password": password

    }
    db.collection('tblper').insertOne(data, function (err, collections) {
        if (!err) {
            console.log("record inserted");
            return res.redirect('signup-success.html');
        }
        else {
            console.log(err.message);
        }

    })

})
//login data process
app.post("/signup-login-successfully", function (req, res) {

    var email = req.body.email;
    var password = req.body.password;
    var dat = {

        "email": email,
        "password": password

    }
    db.collection('tblper').find(dat).toArray(function (err, collectionr) {
        if (!err) {
            console.log("records checks");

            console.log(collectionr)
            return res.redirect('signup-login-successfully.html');

        }
        else {
            console.log(err.message);
        }
    })


})



//Forget-Password in proccess
app.post("/signup-success", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var finddocument = { "email": email };
    var newPassword = { $set: { "password": password } };
    db.collection('tblper').updateOne(finddocument, newPassword, function (err, documents) {
        if (!err) {
            console.log(documents);
            console.log("record update");

        }
        else {
            console.log(err.message);
        }
    })
    //console.log("2:-" + err)
    return res.redirect("/signup-success.html");
})
// app.get("/products", function (req, res) {



//     db.collection('tblorder').find().toArray(function (err, documents) {
//         if (!err) {

//             res.send(documents);

//             console.log("record read");


//         }

//         else {
//             console.log(err);
//         }

//     })

// });
app.post("/order", (req, res) => {
    var kk = req.body.kk;
    var txtMobile = req.body.txtMobile;
    var courseName = req.body.courseName;


    var order = {
        "kk": kk,
        "txtMobile": txtMobile,
        "courseName": courseName,


    }
    db.collection('tblorder').insertOne(order, function (err, collections) {
        if (!err) {
            console.log("record inserted");


        }
        else {
            console.log(err.message);
        }

    })

})


app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });

    return res.redirect('HomePage.html');
    // res.send("Hello Kishan");
}).listen(port);
console.log("Listening on Kishan servser http://localhost:3000 ");