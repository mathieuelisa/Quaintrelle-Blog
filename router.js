const express = require("express");
const app = express();
const mongoose = require("mongoose");

const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien.";

const router = express.Router();

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema);

router.get("/", (req, res) => {
  Post.find({}, (error, posts) => {
    if (error) {
      console.error(error);
    } else {
      res.render("home", {
        posts: posts,
      });
    }
  });
});

router.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

router.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});
router.get("/compose", (req, res) => {
  res.render("compose");
});

router.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });
  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

router.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, (err, post) => {
    if (err) console.log(err);
    else {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});

module.exports = router;
