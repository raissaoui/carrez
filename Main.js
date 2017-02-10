/*Main*/

var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

function include(fileName){

  document.write("<script type='text/javascript' src='"+fileName+"'></script>" );

}

function cleanData(text){
  text.replace(/(\r\n|\n|\r)/gm,"");
  text=text.trim();
  return text;
}
var price_annonce;
var type;
var lowest_price_House;
var lowest_price_Flat;
var highest_price_Flat;
var highest_price_House;
var medium_price_Flat;
var medium_price_House;
var message;

app.get('/main', function(req, res){
  res.send('home');
  
  if (type=="House"){
    if(price>medium_price_House){
      message="Bad deal";
      console.log(message);
    }
    else {
      message="Good deal";
      console.log(message);
    }
  }
  else if(type=="Flat"){
    if(price>medium_price_Flat){
      message="Bad deal";
      console.log(message);
    }
    else{
      message="Good deal";
      console.log(message);
    }
  }
})

app.listen('3000')
console.log('Magic happens on port 3000');
exports = module.exports = app;
