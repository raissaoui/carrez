/*Main*/

var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

/*function include(fileName){

  document.write("<script type='text/javascript' src='"+fileName+"'></script>" );

}

function cleanData(text){
  text.replace(/(\r\n|\n|\r)/gm,"");
  text=text.trim();
  return text;
}*/

app.get('/main', function(req, res){
  res.send('home');
})

app.listen('3000')
console.log('Magic happens on port 3000');
exports = module.exports = app;
