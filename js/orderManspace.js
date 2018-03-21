window.onload = function () {
    var Orders = Bmob.Object.extend("Orders");
    var query = new Bmob.Query(Orders);
// 查询所有数据
    query.find({
        success: function(results) {
            // alert("共查询到 " + results.length + " 条记录");
            // 循环处理查询到的数据
			var allstr;
            var array = []
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

                var allstr ='<tr><td>'+(i+1)+'</td><td>'+object.get("orderNum")+'</td><td>'+object.get("name")+'</td><td>'+state+'</td>\
                        <td>'+object.get("makeDealTime")+'</td><td>'+object.get("payment")+'</td><td><div class="btn-group">\
                        <a href="orderManspaceEdit.html?id='+object.id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i></a>\
                        <button spaceid="'+object.id+'" class="btn btn-warning btn-sm deleteList"><i class="fa fa-times"></i></button>\
                        </div></td></tr>';
                $('#tbody').html(allstr);
            }
        },
        error: function(error) {
            alert("查询失败: " + error.code + " " + error.message);
        }
    });
}




