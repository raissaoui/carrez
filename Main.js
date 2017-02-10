/*Main*/

/*formulaire
<FORM>
    <INPUT type="text" name="Ville" value="Valeur initiale">
    <INPUT type="text" name="Prix" value="Valeur initiale">
    <INPUT type="text" name="TypedeBien" value="Valeur initiale">
    <INPUT type="text" name="SurfaceMinimale" value="Valeur initiale">
    <INPUT type="text" name="SurfaceMaximale" value="Valeur initiale">
    <INPUT type="text" name="Pièces" value="Valeur initiale">
    <INPUT type="button" value="Changer le contenu"
    onClick=' this.form.zonedetexte.value="NOUVEAU" '>
</FORM>


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

app.get('/main', function(req, res){
  var title;

  //url = 'https://www.leboncoin.fr/ventes_immobilieres/1089637884.htm?ca=12_s';

  /*module.exports=function ma(town,callback){
    callback && callback(square);
  }


function include(fileName){

  document.write("<script type='text/javascript' src='"+fileName+"'></script>" );

}


/*  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      include('Scraping_data.js');
      include('MeilleursAgents.js');
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

/*app.listen('3000')
console.log('Magic happens on port 3000');
exports = module.exports = app;*/





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

app.get('/main', function(req, res){
  var title;
})
app.listen('3000')
console.log('Magic happens on port 3000');
exports = module.exports = app;
