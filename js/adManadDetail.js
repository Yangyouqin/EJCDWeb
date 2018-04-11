window.onload = function () {
    var adId = location.href.split('=')[1];
    var Advertisement = Bmob.Object.extend("Advertisement");
    var query = new Bmob.Query(Advertisement);
    query.get(adId, {
        success: function(advertisement) {
            // 查询成功，调用get方法获取对应属性的值
            $('#adname').val(advertisement.get("adName"));
            $('#advertiser').val(advertisement.get("companyName"));
            $('#startDate').val(advertisement.get("startDate"));
            $('#endDate').val(advertisement.get("endDate"));
            $('#payment').val(advertisement.get("payment")+"元");
            $('#adPhone').val(advertisement.get("adPhone"));
            $('#adName').val(advertisement.get("adName"));
            $('#user').val(advertisement.get("userName"));
            //缩略图显示
            var thumbsHtml='';
            thumbsHtml+='<div class="imgwarp"><img src="'+advertisement.get("adImgs")._url+'"></div>';
            // for(var i=0; i<advertisement.get("trainImg1").length; i++){
            //     thumbsHtml+='<div class="imgwarp"><img src="'+advertisement.get("trainImg1")[i]._url+'"><a href="javascript:;" imgid="'+advertisement.get("trainImg1")[i]._url+'">删除</a></div>';
            // }
            $('#oldthumb').html(thumbsHtml);

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
            window.location.href="../trainManspace.html";
        },
        error: function(object, error) {

        }
    });
}

function back(){
    window.location.href = "adManad.html"
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


