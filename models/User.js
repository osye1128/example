const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const saltRounds=10;

const userSchema = mongoose.Schema({
  name:{
    type:String,
    maxlength:50
  },
  email:{
    type:String,
    trim:true,
    unique:1
  },
  password:{
    type:String,
    minlength:5
  },
  lastname:{
    type:String,
    maxlength:50
  },
  role:{
    type:Number,
    default:0
  },
  image:String,
  token:{
    type:String
  },
  tokenExp:{
    type:Number
  }
});

//비밀번호 암호화 1.salt생성, 2.salt로 hash암호화
userSchema.pre('save',function (next){
  const user=this;
  if(user.isModified('password')){
  bcrypt.genSalt(saltRounds,(err,salt)=>{
    if(err) return next(err);
    bcrypt.hash(user.password,salt,(err,hash)=>{
      if(err) return next(err);
      user.password=hash; 
      next();
    })
  })
}else{
  next();
}})

userSchema.methods.comparePassword=function(painpassword,cb){
  bcrypt.compare(painpassword,this.password,(err,isMatch)=>{
    if(err) return cb(err);
     cb(null,isMatch);
  })
};

userSchema.methods.generateToken=function(cb){
  const user=this;
  const token=jwt.sign(user._id.toHexString(),'scretToken');
  user.token=token;
  user.save(function(err,user){
    if(err) return cb(err);
    cb(null,user);
  })
}

userSchema.statics.findByToken=function(token, cb){
  const user=this;
  jwt.verify(token,'secretToken',(err,decoded)=>{
    user.findOne({"_id":decoded,"token":token},function(err,user){
      if(err) return err;
      cb(null,user);
    })
  })
}

const User=mongoose.model('User',userSchema);

module.exports={User}
