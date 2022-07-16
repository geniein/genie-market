const router = require("express").Router();
const passport = require('passport');
const models = require("../models");

router.get('/sessioncheck',(req,res)=>{
    if(req.session.user){
        res.send('session valid');
    }else{
        res.send('session invalid');
    }
})

router.post("/login", async (req,res, next) =>{  
//passport
    passport.authenticate('local',(err, user, info)=>{
        console.log(err)
        console.log(user)
        console.log(info)

        if(err){
            console.log(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr)=>{
            if(loginErr){
                console.log(loginErr);
                return next(loginErr);
            }
            return res.status(200).json(user);
        })
    })(req,res,next);
//
    // const userId = req.body.userId;
    // const pwd = req.body.pwd;
    // const getInfo = await models.Account.findOne(
    //     {
    //     where: {
    //         user_id:userId,
    //         pwd     
    //     } 
    //     }
    // );    
    // if(getInfo?.user_id !== undefined){    
    //     req.session.user = {
    //     userId: req.body.userId,
    //     authorized: true
    //     };
    //     req.session.save((err) => {
    //         if (err) {
    //             console.log('save');
    //             console.log(err);
    //             // return res.status(500).send("<h1>500 error</h1>");
    //         }
    //         // res.redirect("/");
    //     });
    //     res.send({
    //         result: true,
    //     });
    //     console.log(req.session);
    // }else{
    //     res.send({
    //         result: false,
    //     });
    // }                     
});  

router.post('/logout', (req,res)=>{
    console.log('logout');
    if(req.isAuthenticated()){
        req.logout((err)=>{
            if(!err) req.session.save(()=>{
                //res.redirect('http://localhost:3000/'); //일반적으로 redirect
                res.json("logout"); //일반적으로 redirect
            });
        })        
    }  
});

router.get('/auth', (req,res)=>{
    if(req.isAuthenticated()){
         res.send(req.user);
     }    
});

router.post("/signup",(req,res) =>{  
const userId = req.body.userId;
const pwd = req.body.pwd;
const nickname = req.body.nickname;  
models.Account.create(
    {user_id:userId,
    pwd,
    nickname
    }
).then((param)=>console.log(param));  
res.send({
        result: true,
    });
});

module.exports = router;

