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
    var Diary = Bmob.Object.extend("Match");
    var queryCount = new Bmob.Query(Diary);

    var Place = Bmob.Object.extend("Match");
    var query = new Bmob.Query(Place);
    query.limit(pageSize);
    query.skip((nowPage-1)*pageSize)
    query.descending("createdAt");

    if(searchtext!=""){
        query.contains("matchName",searchtext)
        queryCount.contains("matchName",searchtext)
    }
    queryCount.count({
        success: function(count) {
            // 查询所有数据
            query.find({
                success: function(results) {
                    // alert("共查询到 " + results.length + " 条记录");
                    // 循环处理查询到的数据
                    var array = []
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        var address = getAddress(object,i);
                        array.push(address);
                    }
                    //将内容显示到界面
                    $.when.apply($,array).then(function(){
                        //处理数组
                        $('#tbody').html(Array.prototype.join.call(arguments,''));
                        //页码选择 分页
                        $('#pagination').attr('count',count);
                        var allNum=$('#pagination').attr('count');
                        Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
                            getManagerList(nowPage,pageSize,searchtext);
                        });
                    })
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
function getAddress(object,i){
    var map = new BMap.Map("allmap");
    var $deffer = $.Deferred()
    var address;
    var point = new BMap.Point(object.get("longitude"),object.get("latitude"));
    var gc = new BMap.Geocoder();
    gc.getLocation(point, function(rs) {
        var addComp = rs.addressComponents;
        var address = addComp.province+addComp.city + addComp.district
            + addComp.street + addComp.streetNumber;
        var allstr ='<tr><td>'+(i+1)+'</td><td>'+object.get("matchName")+'</td><td>'+address+'</td><td>'+object.get("matchType")+'</td>\
                        <td>'+object.createdAt+'</td><td><div class="btn-group">\
                        <a href="matchManspaceEdit.html?id='+object.id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i>查看详情</a>\
                        <button spaceid="'+object.id+'" class="btn btn-warning btn-sm deleteList"><i class="fa fa-times"></i>删除</button>\
                        </div></td></tr>';
        return $deffer.resolve( allstr )
    });
    return $deffer.promise();
}




