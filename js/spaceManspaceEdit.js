window.onload = function () {
    var placeId = location.href.split('=')[1];
    var Place = Bmob.Object.extend("Place");
    var query = new Bmob.Query(Place);
    query.include("user");
    query.get(placeId, {
        success: function(place) {
            // 查询成功，调用get方法获取对应属性的值
            $('#spacename').val(place.get("placeName"));
            $('#ownerName').val(place.get("user").get("username"));
            $('#subject').val(place.get("placeType"));
            $('#spacedesc').val(place.get("configures").toString());
            $('#phone').val(place.get("phone"));
            $('#placeNum').val(place.get("placeNum"));
            $('#price').val(place.get("price")+"元/时");
            $('#type').val(place.get("placeType"));
            //缩略图显示
            var thumbsHtml='';
            for(var i=0; i<place.get("placeImg1").length; i++){
                thumbsHtml+='<div class="imgwarp"><img src="'+place.get("placeImg1")[i]._url+'"></div>';
            }
            $('#oldthumb').html(thumbsHtml);
            var point = new BMap.Point(place.get("longitude"),place.get("latitude"));
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function(rs) {
                var addComp = rs.addressComponents;
                var address = addComp.province+addComp.city + addComp.district
                    + addComp.street + addComp.streetNumber;

                $('#address').val(address);
            });
        },
        error: function(object, error) {
            // 查询失败
        }
    });
}

function passed(){
    var placeId = location.href.split('=')[1];
    var Place = Bmob.Object.extend("Place");
    var query = new Bmob.Query(Place);

// 这个 id 是要修改条目的 objectId，你在
    query.get(placeId, {
        success: function(result) {
            result.set('state', 1);
            result.save();
            alert("审核通过！")
            window.location.href="spaceManspace.html";
        },
        error: function(object, error) {

        }
    });
}

function refuse(){
    var placeId = location.href.split('=')[1];
    var Place = Bmob.Object.extend("Place");
    var query = new Bmob.Query(Place);
// 这个 id 是要修改条目的 objectId，你在
    query.get(placeId, {
        success: function(result) {
            result.set('state', -1);
            result.save();
            alert("审核拒绝！")
            window.location.href="spaceManspace.html";
        },
        error: function(object, error) {
            alert("失败！")
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


