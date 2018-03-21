window.onload = function () {
    var orderId = location.href.split('=')[1];
    var Order = Bmob.Object.extend("Orders");
    var query = new Bmob.Query(Order);
    query.get(orderId, {
        success: function(order) {
            // 查询成功，调用get方法获取对应属性的值
            $('#spacename').val(order.get("orderNum"));
            $('#area').val(order.get("oderState"));
            $('#subject').val(order.get("name"));
            $('#spacedesc').val("12");
            // //缩略图显示
            var thumbsHtml='';
            // for(var i=0; i<place.get("placeImg1").length; i++){
            //     thumbsHtml+='<div class="imgwarp"><img src="'+place.get("placeImg1")[i]._url+'"><a href="javascript:;" imgid="'+place.get("placeImg1")[i]._url+'">删除</a></div>';
            // }
            $('#oldthumb').html(thumbsHtml);

        },
        error: function(object, error) {
            // 查询失败
        }
    });
}

function upload() {
    var fileUploadControl = $("#profilePhotoFileUpload")[0];
    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var file = new Bmob.File(file.name, file);
        file.save().then(function(obj) {
            var str = $('<div class="imgwarp"><img src="'+obj._url+'"><a href="javascript:;" imgid="'+obj._url+'">删除</a></div>')
			//把上传的图片加载在下方
            $('#oldthumb').append(str)
        }, function(error) {
            // the save failed.
        });
    }
}


