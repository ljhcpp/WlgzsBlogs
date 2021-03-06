const express=require('express');
const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
const superagent=require('superagent');

router.get('/',function (req,res) {
    let userid = req.session.user.userID;
    const url='http://fcb55d3a76b1d123.natapp.cc/blog/list';
    let aid=req.query;
    superagent
        .get(url)
        .query(aid)
        .query({userid:userid})
        .end(function (err, data) {
            superagent
                .get('http://fcb55d3a76b1d123.natapp.cc/home/index')
                .query({userid : userid})
                .end(function (err,ress) {
                    if (!err) {
                        const datas = JSON.parse(data.text).data;
                        const result= JSON.parse(data.text).result;
                        const cotegory= JSON.parse(data.text).cotegory;
                        const database = JSON.parse(data.text).database;
                        const user=JSON.parse(data.text).user.user;
                        const code=JSON.parse(data.text).code;
                        const past=JSON.parse(data.text).past;
                        const page=JSON.parse(data.text).page;
                        const number = JSON.parse(ress.text).dataother['information'];  //顶部各个部分的数量
                        // console.log(database);

                        for (var i in datas){
                            let labels=datas[i].label.split(',');
                            datas[i].label=labels;
                        }

                        res.render('personblog', {
                            datas,
                            result,
                            cotegory,
                            database,
                            user,
                            code,
                            past,
                            ID:userid,
                            page:page,
                            number,
                        })
                    }
                })
        })
});
router.get('/attention',function (req,res) {
    const url='http://fcb55d3a76b1d123.natapp.cc/blog/attention';
    let aid =req.query;
    let userid = req.session.user.userID;
    superagent
        .get(url)
        .query(aid)
        .query({userid:userid})
        .end(function (err,data) {
            if(!err){
                res.json(JSON.parse(data.text));
            }
        })
});

//删除博客
router.get('/deleteblog',function (req,res) {
    let aid=req.query;
    const url='http://fcb55d3a76b1d123.natapp.cc/blog/deleteblog';
    // const url='http://wlgzs.org:9090/mock/42/blog/deleteblog?id=51';
    superagent
        .get(url)
        .query(aid)
        .end(function (err,data) {
            if(!err){
                res.json( JSON.parse(data.text));
            }
        })
});


//重新编辑博客
// router.get('/editblog',function (req,res) {
//     let aid=req.query;
//     console.log(aid);
//     const url='http://fcb55d3a76b1d123.natapp.cc/update';
//     // const url='http://wlgzs.org:9090/mock/42/blog/deleteblog?id=51';
//     superagent
//         .get(url)
//         .query(aid)
//         .end(function (err,data) {
//             console.log(JSON.parse(data.text));
//             if(!err){
//                 res.json( JSON.parse(data.text));
//             }
//
//         })
// });


module.exports = router;   /*暴露这个 router模块*/
