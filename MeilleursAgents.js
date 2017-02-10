var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrapeMA', function(req, res){
  var title;
    url = 'https://www.meilleursagents.com/prix-immobilier/#estimates';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var lowest_price_House;
            var lowest_price_Flat;
            var mean_price_House;
            var mean_price_Flat;
            var highest_price_House;
            var highest_price_Flat;
            var json_House = { lowest_price_House: "", mean_price_House: "", highest_price_House: ""};
            var json_Flat = {lowest_price_Flat: "",  mean_price_Flat: "", highest_price_Flat: ""};

            $('.row medium-uncollapse baseline--half').find('div.small-12 medium-6 columns prices-summary__cell--row-header > div.left').each(function(i, elm){
              if($(this).text()=="Prix m2 appartement"){
                json_Flat.lowest_price_Flat=$(this).parents().parents().find().text();
                json_Flat.mean_price_Flat=$(this).parents().parents().find().text();
                json_Flat.highest_price_Flat=$(this).parents().parents().find().text();
              }
              if($(this).text()=="Prix m2 maison"){
                json_House.lowest_price_House=$(this).parents().parents().find().text();
                json_House.mean_price_House=$(this).parents().parents().find().text();
                json_House.highest_price_House=$(this).parents().parents().find().text();
              }
            })


            fs.writeFile('meilleursagents.js', JSON.stringify(json, null, 6), function(err){
                res.send('File successfully written! - Check your project directory for the output.json file');
            })
        }
        res.send('Check your console!')
    })

})

app.listen('3000')
console.log('Magic happens on port 3000');
exports = module.exports = app;
