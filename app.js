const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

// add this back in, when working locally
require('dotenv').config({path: __dirname + '/.env'})


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
const uri = "mongodb+srv://"+dbUser+":"+dbPassword+"@learningcluster.eufjoqu.mongodb.net/"+dbName+"?retryWrites=true&w=majority"

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

const blogSchema = ({
    title: String,
    blogText: String,
    user: String 
})

const Blog = mongoose.model("Blog", blogSchema)

async function createEntry(userblogTitle,userblogText,user=""){
    console.log(userblogTitle + userblogText)

    const blog = new Blog({
        title: userblogTitle,
        blogText: userblogText,
        user: user
    })

    await blog.save();
    console.log("New Blog saved");
}





// This is required to use the bodyParser for HTML sites
app.use(bodyParser.urlencoded({ extended: true }));

const data = [];

app.get("/", function(req,res){
    Blog.find()
    .then(blog => {
        console.log(blog.title + blog.blogText)
        res.render("home",{titlePost:blog});
    })
    .catch(error => {
        console.log(error);
        res.render("error"); // Render an error page or handle the error in an appropriate way
      });
    // res.render("home",{titlePost:data});
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


app.post("/blog", async function(req,res){
    const redirectName = await createEntry(req.body.title,req.body.blog);
    console.log(redirectName)

    const newBlog = {
        title: req.body.title,
        blog: req.body.blog
      };
    data.push(newBlog);
    res.redirect("/");
});


app.listen(3000, function(){
    console.log("Server is running.");
});