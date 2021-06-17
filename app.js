//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const _ = require("lodash")
const mongoose = require("mongoose")
const router = require("./router")

const app = express();

// Moteur de template
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(router)

// Mongoose connection
mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});

// Server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});

