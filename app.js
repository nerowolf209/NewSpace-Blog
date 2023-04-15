const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// this is commonly used when accessing css files. 
//app.use(express.static('public'));

// This is required to use the bodyParser for HTML sites
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req,res){
    res.render("home")
});


app.listen(3000, function(){
    console.log("Server is running.");
});