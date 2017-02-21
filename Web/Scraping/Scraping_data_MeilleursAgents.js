var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var ville="";
var cp="";


var MeilleursAgents = function(url,callback){

//app.get('/scrapingMeilleursAgents', function(req, res){
  var title;
    //url = 'http://www.meilleursagents.com/prix-immobilier/'+ville+'-'+cp+'/';
    url='http://www.meilleursagents.com/prix-immobilier/courbevoie-92400/';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var lowest_price_House;
            var lowest_price_Flat;
            var medium_price_House;
            var medium_price_Flat;
            var highest_price_House;
            var highest_price_Flat;
            var json_House = { lowest_price_House: "", medium_price_House: "", highest_price_House: ""};
            var json_Flat = {lowest_price_Flat: "",  medium_price_Flat: "", highest_price_Flat: ""};

            $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.medium-offset-0.columns.prices-summary__cell--muted').filter(function(){
              var data=$(this).text();

              json_Flat.lowest_price_Flat=data;

              console.log(json_Flat.lowest_price_Flat);
            })

            $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.columns.prices-summary__cell--median').filter(function(){
              var data=$(this).text();

              json_Flat.medium_price_Flat=data;

              console.log(json_Flat.medium_price_Flat);
            })

            $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2) > div:nth-child(4)').filter(function(){
              var data=$(this).text();

              json_Flat.highest_price_Flat=data;

              console.log(json_Flat.highest_price_Flat);
            })


            $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(3) > div.small-4.medium-2.medium-offset-0.columns.prices-summary__cell--muted').filter(function(){
              var data=$(this).text();

              json_House.lowest_price_House=data;

              console.log(json_House.lowest_price_House);
            })


            $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(3) > div.small-4.medium-2.columns.prices-summary__cell--median').filter(function(){
              var data=$(this).text();

              json_House.medium_price_Flat=data;

              console.log(json_House.medium_price_Flat);
            })


            $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(3) > div:nth-child(4)').filter(function(){
              var data=$(this).text();

              json_House.highest_price_House=data;

              console.log(json_House.highest_price_House);
            })


            fs.writeFile('meilleursagents.js', JSON.stringify(json_House,json_Flat, 6), function(err){
                res.send('File successfully written! - Check your project directory for the output.json file');
            })
        }
        res.send('Check your console!')
        callback(json_House);
        callback(json_Flat);
    })

}



/*app.listen('3000')
console.log('Magic happens on port 3000');*/
//exports = module.exports = app;
exports.MeilleursAgents = MeilleursAgents;
