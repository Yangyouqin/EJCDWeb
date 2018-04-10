window.onload = function () {
    // var userid = localStorage['id'];
	var userid = location.href.split('=')[1];
    var query = new Bmob.Query(Bmob.User);
    query.equalTo('objectId', userid);  // find all the women
    query.find({
        success: function(user) {
            // Do stuff

            $('#username').val(user[0].getUsername());
			$('#sex').val(user[0].get("sex"));
            $('#job').val("管理员");
            $('#mobile').val(user[0].get("mobilePhoneNumber"));
            $('#email').val(user[0].getEmail());
        }
    });

}
function save() {
    var userid = location.href.split('=')[1];
    var currentUser = Bmob.User.current();
    if (currentUser.id == userid || currentUser.id == "-1") {
        // 编辑的用户是当前用户才可以修改管理员信息
        var query = new Bmob.Query(Bmob.User);
        query.get(location.href.split('=')[1], {
            success: function(user) {
                // 回调中可以取得这个 user 对象的一个实例，然后就可以修改它了
                user.setUsername( document.getElementById('username').value);
                user.set('sex', document.getElementById('sex').value);
                user.set('job',document.getElementById('job').value);
                var email = document.getElementById('email').value;
                if(email != ""){
                    user.set('email',document.getElementById('email').value);
                }
                user.set('mobilePhoneNumber',document.getElementById('mobile').value);
                user.save();
                alert("修改成功！")
                // The object was retrieved successfully.
            },
            error: function(object, error) {
                var s = 's';
            }
        });
    } else {
        // show the signup or login page
        alert("没有权限操作！")
    }

}