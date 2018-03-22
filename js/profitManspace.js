window.onload = function () {

    var Orders = Bmob.Object.extend("Orders");
    var query = new Bmob.Query(Orders);
    //统计收费，按场地分组
    query._extraOptions = {"sum":"payment,profit","groupby":"name"};
    query.ascending("createdAt");
// 查询所有数据
    query.find({
        success: function (results) {
            var allstr = [];
            //如果不为空才进行统计,显示到界面上
            if (results.length!=0) {
                for(var i = 0; i<results.length; i++){
                    var str ='<tr><td>'+(i+1)+'</td><td>'+results[i].get("name")+'</td><td>'+results[i].get("_sumPayment")+'</td><td>'+results[i].get("_sumPayment")+'</td>\
                        <td>'+results[i].get("_sumPayment")+'</td><td>'+results[i].createdAt+'</td><td><div class="btn-group">\
                        <a href="orderManspaceEdit.html?id='+results[i].get("_sumPayment")+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i></a>\
                        <button spaceid="'+results[i].get("name")+'" class="btn btn-warning btn-sm deleteList"><i class="fa fa-times"></i></button>\
                        </div></td></tr>';
                    allstr.push(str);
                }
                $('#tbody').html(allstr);
            }
        },
        error: function (error) {
            alert("查询失败: " + error.code + " " + error.message);
        }
    });
}




