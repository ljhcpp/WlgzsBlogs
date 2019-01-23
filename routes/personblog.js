const express=require('express');
const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
const superagent=require('superagent');

router.get('/',function (req,res) {

    const url='http://10.1.32.20:18080/blog/list';
    let aid=req.query;
    superagent
        .get(url)
        .query(aid)
        .end(function (err, data) {
            superagent
                // .get('http://10.1.32.20:18080/personal/statistical')
                // .end(function (err, ress) {
                    if (!err) {
                        const datas = JSON.parse(data.text).data;
                        const result= JSON.parse(data.text).result;
                        const cotegory= JSON.parse(data.text).cotegory;
                        // const data3 = JSON.parse(ress.text).data;
                        const user=JSON.parse(data.text).user.user;
                        const code=JSON.parse(data.text).code;
                        const past=JSON.parse(data.text).past;
                        // const database=JSON.parse(data.text).database;
                        // const personInformation=JSON.parse(data.text).datacomments.personInformation;
                        // const dataother=JSON.parse(data.text).dataother;

                        for (var i in datas){
                            let labels=datas[i].label.split('，');
                            datas[i].label=labels;
                        }

                        res.render('personblog', {
                            datas,
                            result,
                            cotegory,
                            data3,
                            user,
                            code,
                            past,
                        })
                    }
                // })
        })
});
router.get('/attention',function (req,res) {
    const url='http://10.1.32.20:18080/blog/attention';
    let aid =req.query;
    superagent
        .get(url)
        .query(aid)
        .end(function (err,data) {
            if(!err){
                res.json(JSON.parse(data.text));
            }
        })
});

// router.get('/list',function (req,res) {
//
//     const url='http://wlgzs.org:9090/mock/42/personal/listblog';
//
//
//     superagent
//         .get(url)
//         .query(req.query)
//         .end(function (err,namedata) {
//
//
//                if(!err){
//                    const datas = JSON.parse(namedata.text).data;
//                    for (var i in datas){
//                        let labels=datas[i].label.split('，');
//                        datas[i].label=labels;
//                    }
//
//                    res.json(datas);
//                }
//
//         })
//
//
//
// });


module.exports = router;   /*暴露这个 router模块*/