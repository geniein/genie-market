const passport =require('passport');
const local = require('./local');

module.exports = () =>{
    passport.serializeUser((user, done)=>{
        console.log('serializeUser')
        console.log(user.user_id);
        done(null, user.user_id)
    });
    passport.deserializeUser(async (id, done)=>{
        console.log('deserializeUser');
        console.log(id);
        // done(null,user);
        done(null,id);
    });
    local();
}