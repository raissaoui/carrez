var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var ville="";
var cp="";
//var url='http://www.meilleursagents.com/prix-immobilier/courbevoie-92400/';
var lowest_price_House;
var lowest_price_Flat;
var medium_price_House;
var medium_price_Flat;
var highest_price_House;
var highest_price_Flat;

var Scraping_data_Leboncoin = require('../Scraping/Scraping_data_Leboncoin.js');
var json=Scraping_data_Leboncoin.leboncoin_city;

var city=function(json,callback){
  var city="";
  if(json!=null){
    for (var i=0; i < json.length; i++){
      if(json[i]!=" "){
        city=city+json[i];
    }
  }

  return city;
  }
}

var cp=function(json,callback){
  var cp="";
  if(json!=null){
    for (var i=json.length; i < 0; i--){
      if(json[i]!=" "){
        cp=cp+json[i];
    }
  }

  return cp;
  }
}


function CleanURL(strUrl) {
    var ref = strUrl.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return ref;
}

var url=function(city,cp,callback){
  if (json != null && json.town != null) {
            var newURL = CleanURL(city) + '-' + cp;
            var urlMeilleursAgents= 'http://www.meilleursagents.com/prix-immobilier/' + newURL + '/';
            return urlMeilleursAgents;
  }
}


var MeilleursAgents_lowest_price_Flat = function(url,callback){
  request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.medium-offset-0.columns.prices-summary__cell--muted').filter(function(){
              var data=$(this).text();

              lowest_price_Flat=data;

              console.log(lowest_price_Flat);
            })
        }
        callback(lowest_price_Flat);
    })

}

var MeilleursAgents_medium_price_Flat = function(url,callback){
  request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.columns.prices-summary__cell--median').filter(function(){
              var data=$(this).text();

              medium_price_Flat=data;

              console.log(medium_price_Flat);
            })
        }
        callback(medium_price_Flat);
    })
}

var MeilleursAgents_highest_price_Flat = function(url,callback){
  request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2) > div:nth-child(4)').filter(function(){
              var data=$(this).text();

              highest_price_Flat=data;

              console.log(highest_price_Flat);
            })
        }
        callback(highest_price_Flat);
    })

}

var MeilleursAgents_lowest_price_House = function(url,callback){
  request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(3) > div.small-4.medium-2.medium-offset-0.columns.prices-summary__cell--muted').filter(function(){
              var data=$(this).text();

              lowest_price_House=data;

              console.log(lowest_price_House);
            })
        }
        callback(lowest_price_House);
    })

}

var MeilleursAgents_medium_price_House = function(url,callback){
  request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(3) > div.small-4.medium-2.columns.prices-summary__cell--median').filter(function(){
              var data=$(this).text();

              medium_price_Flat=data;

              console.log(medium_price_Flat);
            })
        }
        callback(medium_price_Flat);
    })

}

var MeilleursAgents_highest_price_House = function(url,callback){
  request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(3) > div:nth-child(4)').filter(function(){
              var data=$(this).text();

              highest_price_House=data;

              console.log(highest_price_House);
            })
        }
        callback(highest_price_House);
    })
}

exports.MeilleursAgents_lowest_price_Flat = MeilleursAgents_lowest_price_Flat;
exports.MeilleursAgents_medium_price_Flat = MeilleursAgents_medium_price_Flat;
exports.MeilleursAgents_highest_price_Flat = MeilleursAgents_highest_price_Flat;
exports.MeilleursAgents_lowest_price_House = MeilleursAgents_lowest_price_House;
exports.MeilleursAgents_medium_price_House = MeilleursAgents_medium_price_House;
exports.MeilleursAgents_highest_price_House = MeilleursAgents_highest_price_House;
