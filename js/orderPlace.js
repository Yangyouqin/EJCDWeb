window.onload = function () {
    var pageSize=10,nowPage=1;
    var searchtext = document.getElementById("name").value;
    getManagerList(nowPage,document.getElementById("selectNum").value,document.getElementById("name").value);

    //选择每页多少条
    Uiho.effect.selectNum(function(pageSize){
        getManagerList(nowPage,document.getElementById("selectNum").value,document.getElementById("name").value)
    });
    //选择查询
    $('#SelectQueryBtn').on('click',function(){
        //alert(nowPage)
        // isEnable=$('#isEnable').val();
        //选择查询
        getManagerList(nowPage,document.getElementById("selectNum").value,document.getElementById("name").value)
    });
}
function getManagerList(nowPage,pageSize,searchtext) {

    var typeId = location.href.split('=')[1];
    var Diary = Bmob.Object.extend("Orders");
    var queryCount = new Bmob.Query(Diary);
    queryCount.equalTo("typeId",typeId);

    var Orders = Bmob.Object.extend("Orders");
    var query = new Bmob.Query(Orders);
    query.descending("createdAt");
    query.equalTo("typeId",typeId);
    query.limit(pageSize);
    query.skip((nowPage-1)*pageSize)

    if(searchtext!=""){
        query.contains("placeName",searchtext)
        queryCount.contains("placeName",searchtext)
    }
    queryCount.count({
        success: function(count) {
            query.find({
                success: function(results) {
                    // alert("共查询到 " + results.length + " 条记录");
                    // 循环处理查询到的数据
                    var allstr=[];
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        // 1 下单（待付款） 2 付款（待使用） 3 使用（待评论） 4 售后  5 申请退款 6 退款（退款成功）  7 交易关闭，交易关闭
                        var state = object.get("oderState")
                        if(state == 2){
                            state = "待使用"
                        }
                        else if(state == 3){
                            state = "待评论"
                        }
                        else if(state == 5){
                            state = "退款中"
                        }
                        else if(state == 6){
                            state = "退款成功"
                        }
                        else {
                            state = "已完成"
                        }
                        var str ='<tr><td>'+(i+1)+'</td><td>'+object.get("orderNum")+'</td><td>'+object.get("name")+'</td><td>'+state+'</td>\
                        <td>'+object.get("makeDealTime")+'</td><td>'+object.get("payment")+'</td><td><div class="btn-group">\
                       <a href="orderManspaceEdit.html?id='+results[i].id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i>查看详情</a>\
                        </div></td></tr>';
                        allstr.push(str);
                    }
                    $('#tbody').html(allstr);
                    //页码选择 分页
                    $('#pagination').attr('count',count);
                    var allNum=$('#pagination').attr('count');
                    Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
                        getManagerList(nowPage,pageSize,searchtext);
                    });
                    // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
                    var html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementsByTagName("table")[0].outerHTML + "</body></html>";
                    // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
                    var blob = new Blob([html], { type: "application/vnd.ms-excel" });
                    var a = document.getElementById("dy");
                    // 利用URL.createObjectURL()方法为a元素生成blob URL
                    a.href = URL.createObjectURL(blob);
                    // 设置文件名，目前只有Chrome和FireFox支持此属性
                    a.download = "场地盈利总报表.xls";
                },
                error: function(error) {
                    alert("查询失败: " + error.code + " " + error.message);
                }
            });
        },
        error: function(error) {
            // 查询失败
        }
    });
}




