window.onload = function () {
    var matchId = location.href.split('=')[1];
    var Match = Bmob.Object.extend("Match");
    var query = new Bmob.Query(Match);
    query.include("user");
    query.get(matchId, {
        success: function(match) {
            // 查询成功，调用get方法获取对应属性的值
            $('#matchName').val(match.get("matchName"));
            $('#type').val(match.get("matchType"));
            $('#spacedesc').val(match.get("configures").toString());
            $('#matchMess').val(match.get("matchMess"));
            $('#user').val(match.get("user").get("username"));
            $('#phone').val(match.get("phone"));
            $('#matchTime').val(match.get("startTime")+" ~ "+match.get("endTIme"));

            //缩略图显示
            var thumbsHtml='';
            thumbsHtml+='<div class="imgwarp"><img src="'+match.get("matchImg")._url+'"></div>';
            $('#oldthumb').html(thumbsHtml);
            debugger
            var point = new BMap.Point(match.get("longitude"),match.get("latitude"));
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function(rs) {
                var addComp = rs.addressComponents;
                var address = addComp.province+addComp.city + addComp.district
                    + addComp.street + addComp.streetNumber;
                $('#matchAddr').val(address);
            });

        },
        error: function(object, error) {
            // 查询失败
        }
    });
}


function passed(){
    var matchId = location.href.split('=')[1];
    var Place = Bmob.Object.extend("Match");
    var query = new Bmob.Query(Place);

// 这个 id 是要修改条目的 objectId，你在
    query.get(matchId, {
        success: function(result) {
            result.set('state', 1);
            result.save();
            alert("审核通过！")
            window.location.href="matchManspace.html";

        },
        error: function(object, error) {

        }
    });
}

function refuse(){
    var matchId = location.href.split('=')[1];
    var Train = Bmob.Object.extend("Match");
    var query = new Bmob.Query(Train);
// 这个 id 是要修改条目的 objectId，你在
    query.get(matchId, {
        success: function(result) {
            result.set('state', -1);
            result.save();
            alert("审核拒绝！")
            window.location.href="matchManspace.html";
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


