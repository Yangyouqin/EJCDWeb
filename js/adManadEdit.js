$(function () {
    userList()
})
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
function passed(){

    var Advertisement = Bmob.Object.extend("Advertisement");
    var advertisement = new Advertisement();
    advertisement.set("companyName",$("#advertiser")[0].value);
    advertisement.set("startDate",$("#startDate")[0].value);
    advertisement.set("endDate",$("#endDate")[0].value);
    advertisement.set("payment",parseInt($("#payment")[0].value));
    advertisement.set("adPhone",$("#adPhone")[0].value);
    advertisement.set("adName",$("#adname")[0].value);
    advertisement.set("userId",$("#user")[0].value);
    advertisement.set("adPhone",$("#adPhone")[0].value);

    var fileUploadControl = $("#profilePhotoFileUpload")[0];
    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var file = new Bmob.File(file.name, file);
        file.save().then(function(obj) {
            advertisement.set("adImgs",obj);
            advertisement.save(null, {
                success: function(advertisement) {
                    alert('添加数据成功，返回的objectId是：' + advertisement.id);
                },
                error: function(advertisement, error) {
                    // 添加失败
                    alert('添加数据失败，返回错误信息：' + error.description);
                }
            });
        }, function(error) {
            // the save failed.
        });
    }
}

function userList() {
    var query = new Bmob.Query(Bmob.User);
    //查出管理员和高级管理员
    query.containedIn("userType", [2]);
    query.descending("createdAt");
    query.find({
        success: function(managers) {
            managers.forEach(function (value) {
                var str = '<option value="'+value.id+'">'+value.get("username")+'</option>'
                $('#user').append(str)
            })
        }
    });
}

function refuse(){
    window.location.href="adManad.html";
    alert("返回界面");
}



