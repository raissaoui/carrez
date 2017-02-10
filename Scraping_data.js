var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


function cleanData(text){
  text.replace(/(\r\n|\n|\r)/gm,"");
  text=text.trim();
  return text;
}

app.get('/scrapingLeboncoin', function(req, res){
  var title;

  url = 'https://www.leboncoin.fr/ventes_immobilieres/1089637884.htm?ca=12_s';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var json = {price : "", city : "", type : "", surface:""};

      /*$('.price_').filter(function(){
        var data = $(this);
        /*title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();
        json.price = data.attr('content');*/
        $('#adview > section > section > section.properties.lineNegative > div:nth-child(5) > h2 > span.value').filter(function(){
          var data=$(this).text();

          json.price =data;

          console.log(json.price);
        })

        $('#adview > section > section > section.properties.lineNegative > div.line.line_city').filter(function(){
          var data=$(this).text();

          json.city=data;

          console.log(json.city);
        })

        $('#adview > section > section > section.properties.lineNegative > div:nth-child(7)').filter(function(){
          var data=$(this).text();

          json.type=data;

          console.log(json.type);
        })

        $('#adview > section > section > section.properties.lineNegative > div:nth-child(9)').filter(function(){
          var data=$(this).text();

          json.surface=data;

          console.log(json.surface);
        })

        //json.price = $(this).parents().parents().find('#adview > section > section > section.properties.lineNegative > div:nth-child(5) > h2 > span.value').text();
        //json.city=$(this).parents().parents().find('#adview > section > section > section.properties.lineNegative > div.line.line_city').text();
        //json.type=$(this).parents().parents().find('#adview > section > section > section.properties.lineNegative > div:nth-child(7)').text();
        //json.surface=$(this).parents().parents().find('#adview > section > section > section.properties.lineNegative > div:nth-child(9)').text();

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
