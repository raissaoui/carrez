var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


function clean(text){
  text.replace(/(\r\n|\n|\r)/gm,"");
  text=text.trim();
  return text;
}

//var url = 'https://www.leboncoin.fr/ventes_immobilieres/1089637884.htm?ca=12_s';
var price;
var city;
var type;
var surface;

var leboncoin_price = function(url,callback){
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
        $('#adview > section > section > section.properties.lineNegative > div:nth-child(5) > h2 > span.value').filter(function(){
          var data=$(this).text();

          price =data;

          console.log(price);
        })
    }
    callback(price);
  })
}
var leboncoin_city = function(url,callback){
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
        $('#adview > section > section > section.properties.lineNegative > div.line.line_city').filter(function(){
          var data=$(this).text();
          city=data;
          console.log(city);
        })
    callback(city);
  }
})
}

var town=function(city,callback){
  var twon="";
  if(json!=null){
    for (var i=0; i < city.length; i++){
      if(city[i]!=" "){
        town=town+city[i];
      }
      else{
        break;
      }
  }
  return town;
  }
}

var cp=function(city,callback){
  var cp="";
  if(city!=null){
    for (var i=city.length; i < 0; i--){
      if(city[i]!=" "){
        cp=cp+city[i];
      }
      else{
        break;
      }
  }
  return cp;
  }
}
var leboncoin_type = function(url,callback){
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

        $('#adview > section > section > section.properties.lineNegative > div:nth-child(7)').filter(function(){
          var data=$(this).text();

          type=data;

          console.log(type);
        })
    }
    callback(type);
  })
}
var leboncoin_surface= function(url,callback){
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
        $('#adview > section > section > section.properties.lineNegative > div:nth-child(9)').filter(function(){
          var data=$(this).text();
          surface=data;
          console.log(surface);
        })
    }
    callback(surface);
  })
}


exports.leboncoin_price = leboncoin_price;
exports.leboncoin_city = leboncoin_city;
exports.leboncoin_type = leboncoin_type;
exports.leboncoin_surface = leboncoin_surface;
