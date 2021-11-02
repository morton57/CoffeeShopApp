var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb+srv://user:1234@coffeeshop.tkunn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/",(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var name = req.body.name;
    var account_type = "Customer";

    var data = {
        "username": username,
        "password" : password,
        "email": email,
        "name" : name,
        "account_type": account_type
    }

    db.collection('Customer').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('order-form.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");