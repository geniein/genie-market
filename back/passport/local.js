const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const bcrypt = require('bcrypt');
const models = require('../models');

module.exports = () =>{
passport.use(new LocalStrategy({
  usernameField: 'userId',
  passwordField: 'pwd'
}, async(userId, pwd, done)=>{
  try{
    const user = await models.Account.findOne({
      where:{user_id: userId}
    });
    console.log(user);
    if(!user){
      return done(null, false, {reason: "Not Exist"});
    }    
    // const result = await bcrypt.compare(pwd, user.pwd);
    if(pwd === user.pwd){
      return done(null, user);    
    }
    return(null, false, {reason:"Wrong Password"});
  } catch (err){
    console.log(err);
    return done(err);
  }
}));
}