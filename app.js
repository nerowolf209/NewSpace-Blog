const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

// add this back in, when working locally
//require('dotenv').config({path: __dirname + '/.env'})


const app = express();

// this is commonly used when accessing css files. 
app.use(express.static('public'));
app.use('/viewBlog/css', express.static(__dirname + '/public/css'));
app.use('/viewBlog/js', express.static(__dirname + '/public/js'));

app.set('view engine','ejs');

// Database setup
dbName = "toDoListDB"
const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USER;
const uri = "mongodb+srv://"+dbUser+":"+dbPassword+"@todolistcluster.wbzvvrw.mongodb.net/"+dbName+"?retryWrites=true&w=majority"

const client = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    w: 'majority',
    wtimeoutMS: 10000,
    retryWrites: true,
  };




// Mongoose section //
// Local host
//mongoose.connect('mongodb://127.0.0.1:27017/'+ dbName);

mongoose.connect(uri,client)
  .then(() => {
    console.log("mongoDB connected successfully");
  })
  .catch((err) => {
    console.log("Error while connecting", err);
  })







// This is required to use the bodyParser for HTML sites
app.use(bodyParser.urlencoded({ extended: true }));

const data = [];

app.get("/", function(req,res){
    res.render("home",{titlePost:data});
});

app.get("/blog", function(req,res){
    res.render("createBlog");
});

app.get("/about", function(req,res){
    res.render("about");
});

app.get("/viewBlog/:i",function(req,res){
    const arrayValue = req.params.i;
    console.log(data);
    if (data[arrayValue]) {
        res.render('viewBlog', { titlePost: data[arrayValue].title, blogPost: data[arrayValue].blog });
      } else {
        res.status(404).send('Blog post not found');
      }
    //res.render('viewBlog', {titlePost:data[arrayValue].title,blogPost:data[arrayValue].blog})
})

app.get("/contact", function(req,res){
    res.render('contact');
})

app.get("/success", function(req,res){
    res.render('success');

})

app.post("/contact", function(req,res){
    console.log(req.body);
  
    // Redirect to /success immediately, then redirect to / after 5 seconds
    res.redirect("/success");
  });


app.post("/blog", function(req,res){
    const newBlog = {
        title: req.body.title,
        blog: req.body.blog
      };
    data.push(newBlog);
    res.redirect("/");
})


app.listen(3000, function(){
    console.log("Server is running.");
});