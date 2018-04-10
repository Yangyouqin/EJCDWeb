
function upload() {
    var fileUploadControl = $("#profilePhotoFileUpload")[0];
    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var file = new Bmob.File(file.name, file);
        file.save().then(function(obj) {
            var str = $('<div class="imgwarp"><img src="'+obj._url+'"><button class="newimage" id="deleteImg" type="button" tag="删除">删除</button></div>')
            //把上传的图片加载在下方
            $('#oldthumb').append(str)
            deletenewimage();
        }, function(error) {
            // the save failed.
        });
    }
}

function deleteImg() {
    //把上传的图片加载在下方
    var str = '';

    $('#oldthumb').append(str)
}
function passed(){

    var user = new Bmob.User();
    user.set("username",$("#username")[0].value);
    user.set("password",$("#password")[0].value)
    user.set("sex",$("#sex")[0].value);
    user.set("userType",parseInt($("#position")[0].value));
    user.set("mobilePhoneNumber",$("#phone")[0].value);
    user.set("email",$("#email")[0].value);

    var fileUploadControl = $("#profilePhotoFileUpload")[0];
    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var file = new Bmob.File(file.name, file);
        file.save().then(function(obj) {
            user.set("headImg",obj);
            user.signUp(null, {
                success: function(user) {
                    alert('添加数据成功，返回的objectId是：' + user.id);
                },
                error: function(user, error) {
                    // Show the error message somewhere and let the user try again.
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }, function(error) {
            // the save failed.
        });
    }else {
        alert("请先上传头像");
    }
}

function refuse(){
    window.location.href="index.html";
    alert("返回界面");
}



