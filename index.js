const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const port=5000;
const {User}=require('./models/User');
const config=require('./config/dev');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cookieParser());

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
});

app.post('/login',(req,res)=>{
  User.findOne({email:req.body.email},(err,user)=>{
    if(!user){
      return res.json({loginSuccess:false,message:"제공된 이메일에 해당하는 이메일이 없습니다."})
    }
  
    
  user.comparePassword(req.body.password,(err,isMatch)=>{
    if(!isMatch){
      return res.json({loginSuccess:false,message:"입력하신 비밀번호가 일치하지 않습니다."})
    
      //토큰생성
      user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);

        //토큰을 쿠키에 저장
        res.cookie('x-auth',user.token).status(200).json({
          loginSuccess:true,userId:user._id
        })
      })
    }
  })
})
})

app.listen(port,(req,res)=>console.log('welcome to 5000!!'))