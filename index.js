const express=require('express');
const mongoose=require('mongoose');
const app=express();
const bodyParser=require('body-parser');
const port=5000;
const {User}=require('./models/User');
const config=require('./config/dev');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

mongoose.connect(config.mongoURI,{
  useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('mongodb connected..')).catch((err)=>console.log(err));

app.get('/',(req,res)=>res.send('welcome!'));

app.post('/register',(req,res)=>{
  const user = new User(req.body);
  user.save((err,userInfo)=>{
    if(err) return res.json({success:false,err});
      return res.status(200).json({success:true});
  });
})

app.listen(port,(req,res)=>console.log('welcome to 5000!!'))