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
    var Diary = Bmob.Object.extend("Advertisement");
    var queryCount = new Bmob.Query(Diary);

    var Advertisement = Bmob.Object.extend("Advertisement");
    var query = new Bmob.Query(Advertisement);
    query.limit(pageSize);
    query.skip((nowPage-1)*pageSize);
    query.include("user");
    query.descending("createdAt");
    debugger
    // if(searchtext!=""){
    //     query.contains("placeName",searchtext)
    //     queryCount.contains("placeName",searchtext)
    // }
    queryCount.count({
        success: function(count) {
            // 查询所有数据
            query.find({
                success: function(results) {
                    // alert("共查询到 " + results.length + " 条记录");
                    // 循环处理查询到的数据
                    var allstr = []
                    for (var i = 0; i < results.length; i++) {
                        var str ='<tr><td>'+(i+1)+'</td><td>'+results[i].get("adName")+'</td><td>'+results[i].get("user").get("username")+'</td><td>'+results[i].get("companyName")+'</td>\
                        <td>'+results[i].get("adPhone")+'</td><td>'+results[i].get("startDate")+'</td><td>'+results[i].get("endDate")+'</td><td>'+results[i].get("payment")+'</td><td><div class="btn-group">\
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





