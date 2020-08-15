const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const router = express.Router();
const app = express();
const fs = require('fs');
const path = require('path');
const quotes = require('./quotes.json')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/index.html`)
   // res.send("Good");
})
app.listen(process.env.PORT || 3000, function(){
    console.log('Server is listening on port 3000');
})
function getQuote(req,res){
    if (req.params.id>0 && quotes[req.params.id-1]){
        res.send(quotes[req.params.id-1].line);
    }
    else{
        var randN = Math.floor((Math.random() * 2));
        console.log(randN);
        res.send(quotes[randN].line);
    }
}
app.get("/api/quote",(req,res)=>{
    getQuote(req,res);
})
app.get("/api/quote/:id",(req,res)=>{
    getQuote(req,res);
})
app.get('/*',(req,res)=>{
    res.redirect('/')
})

//module.exports = router;