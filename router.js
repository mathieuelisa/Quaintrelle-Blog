const express = require('express')
const app = express()
const mongoose = require("mongoose")

const homeStartingContent = "Lacus vel facilisis volutpat est"
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque."
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien."

const router = express.Router()

const postSchema = new mongoose.Schema({
    title: String,
    content: String
  })

const Post = mongoose.model("Post", postSchema);
  
  
  router.get("/", function (req,res){

    Post.find({}, function (err, posts){
       if(err){
         console.log(err)
       } else {
         res.render("home", {
           startingContent:homeStartingContent,
           posts:posts
         })
       }
  })
});

router.get("/about", function (req,res){
    res.render("about", {aboutContent:aboutContent})
  });

router.get("/contact", function (req,res){
    res.render("contact", {contactContent:contactContent})
  });
router.get("/compose", function (req,res){
    res.render("compose")
  });

router.post("/compose", function (req, res){

    const post = new Post ({
      title: req.body.postTitle,
      content: req.body.postBody
      });
      post.save(function(err){
        if(!err){
          res.redirect("/")
        }
      });
  });

  module.exports = router;
  