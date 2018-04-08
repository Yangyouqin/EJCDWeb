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
    queryCount._extraOptions = {"sum":"payment,profit,charge","groupby":"name,ownerUser"};

    var Orders = Bmob.Object.extend("Orders");
    var query = new Bmob.Query(Orders);
    query.include("ownerUser");
    //统计收费，按场地分组
    query._extraOptions = {"sum":"payment,profit,charge","groupby":"name,ownerUser"};

    queryCount.count({
        success: function(count) {
            query.find({
                success: function (results) {

                    var allstr = [];
                    //如果不为空才进行统计,显示到界面上
                    if (results.length!=0) {
                        var n = results.length;
                        debugger
                        for (var i = 0; i < n - 1; i++) {
                            for (var j = 0; j < n - 1; j++) {
                                if (results[j].get("_sumPayment") < results[j + 1].get("_sumPayment")) {
                                    var temp = results[j];
                                    results[j] = results[j + 1];
                                    results[j + 1] = temp;
                                }
                            }
                        }
                        for(var i = 0; i<results.length; i++){
                            var str ='<tr><td>'+(i+1)+'</td><td>'+results[i].get("name")+'</td><td>'+results[i].get("ownerUser").get("username")+'</td><td>'+results[i].get("_sumPayment")+'</td>\
                        <td>'+results[i].get("_sumPayment")+'</td><td>'+results[i].get("_sumCharge")+'</td><td><div class="btn-group">\
                        <a href="orderManspaceEdit.html?id='+results[i].id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i>查看详情</a>\
                        <a href="showManagerEdit.html?id='+results[i].id+'" class="btn btn-warning btn-sm deleteList"><i class="fa fa-times"></i>删除</a>\
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




