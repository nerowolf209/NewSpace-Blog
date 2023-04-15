const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// this is commonly used when accessing css files. 
app.use(express.static('public'));

app.set('view engine','ejs');

// This is required to use the bodyParser for HTML sites
app.use(bodyParser.urlencoded({ extended: true }));

const blogData = []
let data = {"title":"","blog":""};

app.get("/", function(req,res){
    res.render("home")
});

app.get("/blog", function(req,res){
    res.render("createBlog")
});

app.get("/about", function(req,res){
    res.render("about")
});

app.post("/blog", function(req,res){
    console.log(req.body)
})

app.listen(3000, function(){
    console.log("Server is running.");
});