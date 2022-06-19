const router = require("express").Router();
const models = require("../models");

router.get('/sessioncheck',(req,res)=>{
    if(req.session.user){
        res.send('session valid');
    }else{
        res.send('session invalid');
    }
})

router.post("/login", async (req,res) =>{  
    const userId = req.body.userId;
    const pwd = req.body.pwd;
    const getInfo = await models.Account.findOne(
        {
        where: {
            user_id:userId,
            pwd     
        } 
        }
    );    
    if(getInfo?.user_id !== undefined){    
        req.session.user = {
        userId: req.body.userId,
        authorized: true
        };
        req.session.save((err) => {
            if (err) {
                console.log('save');
                console.log(err);
                // return res.status(500).send("<h1>500 error</h1>");
            }
            // res.redirect("/");
        });
        res.send({
            result: true,
        });
        console.log(req.session);
    }else{
        res.send({
            result: false,
        });
    }                     
});  

router.post('/logout', (req,res)=>{
if(req.session.user){
    req.session.destroy((err)=>{
    if(err) throw err;
    res.redirect('/login');
    })
}  
});

router.get('/auth', (req,res)=>{
console.log(req.session)
console.log(req.session.user);
if(req.session.user){
    res.send(req.session.user.userId);
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

