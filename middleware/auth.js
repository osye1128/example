const {User} =require('../models/User');

const auth = (req,res,next)=>{
  //클라이언트쿠키에서 토큰을 가져옴
  const token= req.cookies.x_auth;
  //토큰을 복호화한 후 유저를 찾는다
  User.findByToken(token,(err,user)=>{
    if(err) throw err;
    if(!user) return res.json({isAuth : false, error:true});

    req.token=token;
    req.user=user;
    next();
  })
  //유저가 있으면 인증ok

  //유저가 없으면 인증no
}

module.exports={auth}