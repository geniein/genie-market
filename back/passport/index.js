const passport =require('passport');
const local = require('./local');

module.exports = () =>{
    passport.serializeUser((user, done)=>{        
        done(null, user)
    });
    passport.deserializeUser(async (id, done)=>{
        done(null,id);
    });
    local();
}