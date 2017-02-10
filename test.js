const fs=require('fs');
const express=require('express');
const HOSTNAME='localhost';
const PORT=3000;
const app=express();
app.get('/',function(req,res) {
  res.send('home');

});
app.get('/workshop',function(req,res){
  res.send('carrez');
});
app.listen(PORT);
console.log('Server running at http://${HOSTNAME:PORT}');
