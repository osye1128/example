const express=require('express');
const mongoose=require('mongoose');
const app=express();
const port=5000;

mongoose.connect('mongodb+srv://jh:sibar2@nodejs.mylqa.mongodb.net/nodejs?retryWrites=true&w=majority',{
  useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('mongodb connected..')).catch((err)=>console.log(err));

app.get('/',(req,res)=>res.send('welcome!'));

app.listen(port,(req,res)=>console.log('welcome to 5000!!'))