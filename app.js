const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// this is commonly used when accessing css files. 
app.use(express.static('public'));
app.use('/viewBlog/css', express.static(__dirname + '/public/css'));
app.use('/viewBlog/js', express.static(__dirname + '/public/js'));

app.set('view engine','ejs');

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