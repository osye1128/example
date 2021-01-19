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
const user=this;
//비밀번호 암호화 1.salt생성, 2.salt로 hash암호화
userSchema.pre('save',(next)=>{
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

userSchema.methods.comparePassword=(painpassword,cb)=>{
  bcrypt.compare(painpassword,user.password,(err,isMatch)=>{
    if(err) return cb(err);
     cb(null,isMatch);
  })
};

userSchema.methods.generateToken=(cb)=>{
  const token=jwt.sign(user._id,'scretToken');
  user.token=token;
  user.save((err,user)=>{
    if(err) return cb(err);
    cb(null,user)
  })

}

const User=mongoose.model('User',userSchema);

module.exports={User}
