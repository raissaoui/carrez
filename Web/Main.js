var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var fs_Leboncoin = require("fs")
var vm_Leboncoin = require('vm')
var fs_MeilleursAgents = require("fs")
var vm_MeilleursAgents = require('vm')

/*var Scraping_data_MeilleursAgents = require('./Scraping/Scraping_data_MeilleursAgents.js')
var Scraping_data_Leboncoin = require('./Scraping/Scraping_data_Leboncoin.js');*/




var content_Leboncoin = fs_Leboncoin.readFileSync('./Scraping/Scraping_data_Leboncoin.js')
vm_Leboncoin.runInThisContext(content_Leboncoin)
var content_MeilleursAgents = fs_MeilleursAgents.readFileSync('./Scraping/Scraping_data_MeilleursAgents.js')
vm_MeilleursAgents.runInThisContext(content_MeilleursAgents)



Scraping_data_Leboncoin.leboncoin(url, function(data){
   json = data;

   console.log(json);
 });

 Scraping_data_MeilleursAgents.MeilleursAgents(url, function(data){
    json_House = data;
    json_Flat=data;

    console.log(json_House,json_Flat);
  });


var GoodOrBadDeal = function(json,json_House,json_Flat){
   price= json.prix;
   surface =json.surface;
   type=json.type;
   var lowest_price;
   var medium_price;
   var highest_price;
   if(type=="Flat"){
     lowest_price = json_Flat.lowest_price_Flat;
     medium_price = json_Flat.medium_price_Flat;
     highest_price = json_Flat.highest_price_Flat;
   }
   else { //type=="House"
     lowest_price= json_House.lowest_price_Flat;
     medium_price = json_House.medium_price_House;
     highest_price = json_House.highest_price_House;
   }

   var message="";

   if(price <lowest_price){
     console.log("Very good Deal");
     message="Very good Deal";
   }
   else if(price < medium_price && lowest_price > lowest_price){
     console.log("Good Deal");
     message="Good Deal";
   }
   else if(price <medium_price && prix > medium_price){
     console.log("Bad Deal");
     message="Bad Deal";
   }
   else if(price>medium_price){
     console.log("Vary bad Deal");
     message="Vary bad Deal";
    }
  }

app.get('/', function(req,res){
   res.sendfile(__dirname + '\\Main.html');
});

app.listen('3000')
console.log('Magic happens on port 3000');
exports.GoodOrBadDeal = GoodOrBadDeal;
exports.app= app;
