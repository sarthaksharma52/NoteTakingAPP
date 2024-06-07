const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render("index.ejs",{files:files});
    });
});

app.get("/file/:filename", (req,res)=>{
    fs.readFile(`./files/${req.params.filename}`, "Utf-8", function(err,filedata){
        res.render('show',{filename: req.params.filename , filedata: filedata});
    });
});

app.get("/edit/:filename", (req,res)=>{
    res.render('edit',{filename:req.params.filename});
});

app.post("/edit", (req,res)=>{
   fs.rename(`./files/${req.body.previous}`,`./files/${req.body.New}`,function(err){
    res.redirect('/');
   });
});

app.post("/create",(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
    res.redirect("/");
    });
});

app.listen(port,(req,res)=>{
    console.log("app is listen");
});