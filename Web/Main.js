var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


var Scraping_data_MeilleursAgents = require('./Scraping/Scraping_data_MeilleursAgents.js')
var Scraping_data_Leboncoin = require('./Scraping/Scraping_data_Leboncoin.js');
var url="";


function init(res,type){
	res.setHeader('Content-Type', type);
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
}


var json = {price : "", city : "", type : "", surface:""};
var jsonMeilleursAgents={lowest_price_Flat : "", medium_price_Flat : "", highest_price_Flat : "", lowest_price_House : "", medium_price_House : "", highest_price_House : ""};

Scraping_data_Leboncoin.leboncoin_price(url, function(data){
   json = data;
   return json;
 });

 Scraping_data_Leboncoin.leboncoin_city(url, function(data){
    json = data;
    return json;
  });

  Scraping_data_Leboncoin.leboncoin_type(url, function(data){
     json = data;
     return json;
   });

   Scraping_data_Leboncoin.leboncoin_surface(url, function(data){
      json = data;
      return json;
    });

 Scraping_data_MeilleursAgents.MeilleursAgents_lowest_price_Flat(url, function(data){
    jsonMeilleursAgents = data;
    return jsonMeilleursAgents;
  });

  Scraping_data_MeilleursAgents.MeilleursAgents_medium_price_Flat(url, function(data){
     jsonMeilleursAgents = data;
     return jsonMeilleursAgents;
   });

   Scraping_data_MeilleursAgents.MeilleursAgents_highest_price_Flat(url, function(data){
      jsonMeilleursAgents = data;
      return jsonMeilleursAgents;
    });

    Scraping_data_MeilleursAgents.MeilleursAgents_lowest_price_House(url, function(data){
       jsonMeilleursAgents = data;
       return jsonMeilleursAgents;
     });

     Scraping_data_MeilleursAgents.MeilleursAgents_medium_price_House(url, function(data){
        jsonMeilleursAgents = data;
        return jsonMeilleursAgents;
      });

      Scraping_data_MeilleursAgents.MeilleursAgents_highest_price_House(url, function(data){
         jsonMeilleursAgents = data;
         return jsonMeilleursAgents;
       });


var GoodOrBadDeal = function(json,jsonMeilleursAgents){
   price= json.prix;
   surface =json.surface;
   type=json.type;
   var lowest_price;
   var medium_price;
   var highest_price;
   if(type=="Flat"){
     lowest_price = jsonMeilleursAgents.lowest_price_Flat;
     medium_price = jsonMeilleursAgents.medium_price_Flat;
     highest_price = jsonMeilleursAgents.highest_price_Flat;
   }
   else { //type=="House"
     lowest_price= jsonMeilleursAgents.lowest_price_Flat;
     medium_price = jsonMeilleursAgents.medium_price_House;
     highest_price = jsonMeilleursAgents.highest_price_House;
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


app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
   res.sendfile(__dirname + '\\Main.html');
});



app.get('/getData', function(req, res) {
	init(res,'text/json');
	var data = new Object();
	console.log("https://www.leboncoin.fr/ventes_immobilieres/"+req.query.url+".htm");
	if(req.query.url.includes("http")){
		data.Scraping_data_Leboncoin = Scraping_data_Leboncoin.getData(req.query.url);
	}
	else
		data.Scraping_data_Leboncoin  = Scraping_data_Leboncoin .getData("https://www.leboncoin.fr/ventes_immobilieres/"+req.query.url+".htm");
	var path = Scraping_data_MeilleursAgents.getPath(data.Scraping_data_Leboncoin.cp);
	data.Scraping_data_MeilleursAgents = Scraping_data_MeilleursAgents.getData(path)[data.Scraping_data_Leboncoin["type"]];

	res.write(JSON.stringify(data));
	res.end();

});
app.listen('3000')
console.log('Magic happens on port 3000');

exports.GoodOrBadDeal = GoodOrBadDeal;
exports.app= app;
