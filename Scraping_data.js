var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


app.get('/scrape', function(req, res){
  var title;

  url = 'https://www.leboncoin.fr/ventes_immobilieres/1089637884.htm?ca=12_s';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = {price : "", city : "", type : "", surface:""};

      $('.price_').filter(function(){
        var data = $(this);
        title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        json.price = data.attr('content');;
        /*json.city = city;
        json.type=type;
        json.surface=surface;*/
      })
      // get data
      $('.properties.lineNegative').find('div.line > h2 > span.value').each(function(i, elm) {
          var data=$(this);
          var prop=data.prev();
          if(prop.text()=="Type de bien"){
              json.type=data.text();
          }
          else if (prop.children().first().text()=="Ville") {
            json.city=cleanData(data.text());
          }
          else if (prop.text()=="Surface") {
            json.surface=data.text();
          }
      });

      $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

/*function compute(url,callback){
  var json=lbc(url);
  callback && callback(json.town,json.price);
}
compute(url,function(town,price));*/

app.listen('3000')
console.log('Magic happens on port 3000');
exports = module.exports = app;
