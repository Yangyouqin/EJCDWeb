window.onload = function () {
    var orderId = location.href.split('=')[1];

    var Order = Bmob.Object.extend("Orders");
    var query = new Bmob.Query(Order);
    query.include("user");
    query.include("ownerUser");
    query.descending("createdAt");
    query.get(orderId, {
        success: function(order) {
            // 查询成功，调用get方法获取对应属性的值
            $('#spacename').val(order.get("orderNum"));
            $('#orderName').val(order.get("name"));
            $('#user1').val(order.get("user").get("username"));
            $('#phone1').val(order.get("user").get("mobilePhoneNumber"));
            $('#phone').val(order.get("ownerUser").get("mobilePhoneNumber"));
            $('#payment').val(order.get("payment")+"元");
            $('#profit').val(order.get("profit")+"元");
            $('#charge').val(order.get("charge")+"元");
            $('#dealDate').val(order.createdAt);
            var state = '';
            if(order.get("oderState") == 2){
                state = '待使用'
            }
            else if(order.get("oderState") == 3){
                state = '交易成功，待评价'
            }
            else if(order.get("oderState") == 5){
                state = '退款中'
            }
            else if(order.get("oderState") == 6){
                state = '退款成功'
            }
            $('#orderState').val(state);
            // //缩略图显示
            // var thumbsHtml='';
            // for(var i=0; i<order.get("placeImg1").length; i++){
            //     thumbsHtml+='<div class="imgwarp"><img src="'+order.get("placeImg1")[i]._url+'"></div>';
            // }
            // $('#oldthumb').html(thumbsHtml);
            // var point = new BMap.Point(order.get("longitude"),order.get("latitude"));
            // var gc = new BMap.Geocoder();
            // gc.getLocation(point, function(rs) {
            //     var addComp = rs.addressComponents;
            //     var address = addComp.province+addComp.city + addComp.district
            //         + addComp.street + addComp.streetNumber;
            //
            //     $('#address').val(address);
            // });
        },
        error: function(object, error) {
            // 查询失败
        }
    });
}
function back() {
    window.location.href="orderManOrder.html";
}


