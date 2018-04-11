window.onload = function () {
    var trainId = location.href.split('=')[1];
    var Train = Bmob.Object.extend("Trains");
    var query = new Bmob.Query(Train);
    query.get(trainId, {
        success: function(train) {
            // 查询成功，调用get方法获取对应属性的值
            $('#spacename').val(train.get("trainName"));
            $('#type').val(train.get("trainType"));
            $('#phone').val(train.get("phone"));
            $('#type').val(train.get("trainType"));
            var days = train.get("HoursAndDays").split(';')[1];
            var hours = train.get("HoursAndDays").split(';')[0];
            $('#days').val(days);
            $('#hours').val(hours);
            $('#period').val(train.get("period"));
            $('#price').val(train.get("price"));
            $('#spacedesc').val(train.get("configures").toString());
            //缩略图显示
            var thumbsHtml='';
            for(var i=0; i<train.get("trainImg1").length; i++){
                thumbsHtml+='<div class="imgwarp"><img src="'+train.get("trainImg1")[i]._url+'"></div>';
            }
            $('#oldthumb').html(thumbsHtml);
            var point = new BMap.Point(train.get("longitude"),train.get("latitude"));
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
    var trainId = location.href.split('=')[1];
    var Train = Bmob.Object.extend("Trains");
    var query = new Bmob.Query(Train);

// 这个 id 是要修改条目的 objectId，你在
    query.get(trainId, {
        success: function(result) {
            result.set('state', 1);
            result.save();
            alert("审核通过！")
            window.location.href="trainManspace.html";
        },
        error: function(object, error) {

        }
    });
}

function refuse(){
    var trainId = location.href.split('=')[1];
    var Train = Bmob.Object.extend("Train");
    var query = new Bmob.Query(Train);
// 这个 id 是要修改条目的 objectId，你在
    query.get(trainId, {
        success: function(result) {
            result.set('state', -1);
            result.save();
            alert("审核拒绝！")
            window.location.href="trainManspace.html";
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
            var str = $('<div class="imgwarp"><img src="'+obj._url+'"></div>')
			//把上传的图片加载在下方
            $('#oldthumb').append(str)
        }, function(error) {
            // the save failed.
        });
    }
}


