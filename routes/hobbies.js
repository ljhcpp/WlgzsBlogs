const express=require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const superagent=require('superagent');




router.get('/',function (req,res) {
    const url='http://10.1.32.20:18080/home/gettype';
    superagent
        .get(url)
        .end(function (err, data) {
            if(!err){
                const datas=JSON.parse(data.text).data;

                res.render('hobbies',{
                    datas:datas,
                })
            }
        });
});

router.get('/save',function (req,res) {
<<<<<<< Updated upstream
=======
    let userid = req.session.user.userID;
>>>>>>> Stashed changes
    const url='http://10.1.32.20:18080/personal/save';
    superagent
        .get(url)
        .query(req.query)
        .query({userid:userid})
        .end(function (err, data) {
            if(!err){
                // console.log(JSON.parse(data.text));
                res.json(JSON.parse(data.text));
            }
        });
});



module.exports = router;   /*暴露这个 router模块*/