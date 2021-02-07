const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');

const {User}=require('./models/User');
const config=require('./config/dev');

const {auth}=require('./middleware/auth');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cookieParser());


mongoose.connect(config.mongoURI,{
  useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('mongodb connected..')).catch((err)=>console.log(err));

app.get('/',(req,res)=>res.send('welcome!'));

app.get('/api/hello',(req,res)=>{
  res.send('안녕하세요.')
})

app.post('/api/users/register',(req,res)=>{
  const user = new User(req.body);
  user.save((err,userInfo)=>{
    console.log(err);
    if(err) return res.json({success:false,err});
      return res.status(200).json({success:true});
  });
});



app.post('/api/users/login',(req,res)=>{
  User.findOne({email:req.body.email},(err,user)=>{
    
    if(!user){
      return res.json({loginSuccess:false,message:"제공된 이메일에 해당하는 이메일이 없습니다."})
    }
  
  user.comparePassword(req.body.password,(err,isMatch)=>{
    
    if(!isMatch)
      return res.json({loginSuccess:false,message:"입력하신 비밀번호가 일치하지 않습니다."})
      
      
      user.generateToken((err,user)=>{
        console.log(user)
        if(err) return res.status(400).send(err);
        
      
        res.cookie('x_auth',user.token).status(200).json({
          loginSuccess:true,userId:user._id
        })
      })
    }
  )
})
})

//auth:인증된 곳만 입장가능하게 해줌
app.get('/api/users/auth',auth,(req,res)=>{
  res.status(200).json({
    _id:req.user._id,
    isAdmin:req.user.role ===0 ?false:true,
    email:req.user.email,
    name:req.user.name,
    lastname:req.user.lastname,
    role:req.user.role,
    image:req.user.image
  })
});

app.get('/api/users/logout',auth,(req,res)=>{
  User.findOneAndUpdate({_id:req.user._id},{token:""},
  (err,user)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).send({success:true})
  })
})


const port=5000;
app.listen(port,(req,res)=>console.log('welcome to 5000!!'))