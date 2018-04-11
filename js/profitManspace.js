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
    var Diary = Bmob.Object.extend("Orders");
    var queryCount = new Bmob.Query(Diary);
    queryCount._extraOptions = {"sum":"payment,profit,charge","groupby":"name,typeId,ownerUser"};

    var Orders = Bmob.Object.extend("Orders");
    var query = new Bmob.Query(Orders);
    query.include("ownerUser");
    //统计收费，按场地分组
    query._extraOptions = {"sum":"payment,profit,charge","groupby":"name,typeId,ownerUser"};

    queryCount.count({
        success: function(count) {
            query.find({
                success: function (results) {

                    var allstr = [];
                    //如果不为空才进行统计,显示到界面上
                    if (results.length!=0) {
                        var n = results.length;

                        for (var i = 0; i < n - 1; i++) {
                            for (var j = 0; j < n - 1; j++) {
                                if (results[j].get("_sumPayment") < results[j + 1].get("_sumPayment")) {
                                    var temp = results[j];
                                    results[j] = results[j + 1];
                                    results[j + 1] = temp;
                                }
                            }
                        }
                        debugger
                        for(var i = 0; i<results.length; i++){
                            var str ='<tr><td>'+(i+1)+'</td><td>'+results[i].get("name")+'</td><td>'+results[i].get("ownerUser").get("username")+'</td><td>'+results[i].get("_sumPayment")+'</td>\
                        <td>'+results[i].get("_sumPayment")+'</td><td>'+results[i].get("_sumCharge")+'</td><td><div class="btn-group">\
                        <a href="orderPlace.html?id='+results[i].get("typeId")+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i>查看详情</a>\
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
                        a.download = "场地盈利排行表.xls";
                    }
                },
                error: function (error) {
                    alert("查询失败: " + error.code + " " + error.message);
                }
            });
        },
        error: function(error) {
            // 查询失败
        }
    });
}




