const express =require('express');
const router = express.Router();
const superagent=require('superagent');



//owner页面
router.get('/',function (req,res) {
   
    superagent
        .get('http://wlgzs.org:9090/mock/42/personal/listmy?id=12')
        .end(function (err,data) {
            const list=JSON.parse(data.text).data;
            const len=list.length;  // 长度
            const arr=[];
            //分隔之后保存数组中
            for (let i=0;i<len;i++){
                const str=list[i].label;
                arr[i]=str.split(',');
            }
            //数组保存对象中 传对象参数到页面
            const obj={arr:arr};
            superagent
                .get('http://wlgzs.org:9090/mock/42/personal/statistical')
                .end(function (err,data) {
                    const list3=JSON.parse(data.text).data;
                    res.render('owner',{
                        list,
                        obj,
                        data3:list3,
                    })
                });
        })
});
//直接返回data里的内容
function Ask(_href,name,res){
    superagent
        .get(_href)    //每个li请求的地址不同
        .end(function (err,data) {
            var list=JSON.parse(data.text).data;
            res.render('owner/'+name,{
                list
            });
        })
}
//返回records里面的内容
function AskR(_href,name,res){
    superagent
        .get(_href)
        .end(function (err,rest) {
            var list = JSON.parse(rest.text).result.records;
            res.render('owner/'+name,{
                list
            });
        })
}
//需要分割label标签
function Asktags(_href,name,res){
    superagent
        .get(_href)
        .end(function (err,data) {
            var list=JSON.parse(data.text).data;
            for (var i in list){
                var labels=list[i].label.split(',');
                list[i].label=labels;
            }
            res.render('owner/'+name,{
                list,
            });
        })
}

//相应li点击
router.get('/:pathname',function (req,res) {

    //查询的时候带上参数
    let _name = req.params.pathname;
    if (_name == 'tab1') {         //我的博客
        Asktags("http://wlgzs.org:9090/mock/42/personal/personHome?pageNumber=1", _name, res);
    } 
    else if (_name == 'tab2') {  //我的点赞
        Ask("http://wlgzs.org:9090/mock/42/personal/listtwoparts?id=2", _name, res);
    } 
    else if (_name == 'tab3') {  //我的收藏
        Asktags("http://wlgzs.org:9090/mock/42/personal/listtwoparts?id=7", _name, res);
    } 
    else if (_name == 'tab4') {  //我的评论
        AskR("http://wlgzs.org:9090/mock/42/personal/listotherparts?id=3", _name, res);
    } 
    else if (_name == 'tab5') {  //我的关注
        AskR("http://wlgzs.org:9090/mock/42/personal/listotherparts?id=1", _name, res);
    } 
    else if (_name == 'tab6') {  //我的粉丝
        AskR("http://wlgzs.org:9090/mock/42/personal/listotherparts?id=8", _name, res);
    } 
    else if (_name == 'tab7') {   //我的消息
        AskR("http://wlgzs.org:9090/mock/42/personal/listotherparts?id=5", _name, res);
    } 
    else {                       //个人信息
        superagent
            .get('http://wlgzs.org:9090/mock/42/personal/getinfo')
            .end(function (err, data) {
                const list = JSON.parse(data.text).user.user;
                const lable = JSON.parse(data.text).database.module;
                const cotegory = JSON.parse(data.text).cotegory;
                res.render('owner/'+_name, {
                    list,
                    lable,
                    cotegory
                });
                
            })
    }
});

//传回到页面中的参数
// res.send('hello')

module.exports = router;