window.onload = function () {
    var query = new Bmob.Query(Bmob.User);
    //查出管理员和高级管理员
    query.containedIn("userType", [2]);
    query.descending("createdAt");
    query.find({
        success: function(managers) {

            var handel='';
            var allstr = '';
			for(var i=0;i<managers.length;i++){
				var email = managers[i].get("email");
				if(email == undefined){
					email = "暂无"
				}
                var lastTime = managers[i].get("lastLoginTime");
                if (lastTime == undefined) {
                    lastTime = "未知"
                }
                else {
                    lastTime = managers[i].get("lastLoginTime").replace(/\//g, "-")
                }
                var userType = "员工";

                handel='<td><div class="btn-group"><a href="showManagerEdit.html?id='+managers[i].id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i>查看详情</a><a href="showManagerEdit.html?id='+managers[i].get("username")+'" class="btn btn-warning btn-sm deleteList"><i class="fa fa-times"></i>删除</a></div></td>';
                allstr+='<tr><td>'+(i+1)+'</td><td>'+userType+'</td><td>'+managers[i].get("username")+'</td>\
                        <td>'+email+'</td><td>'+managers[i].get("mobilePhoneNumber")+'</td>\
                        <td>'+lastTime+'</td>\
                        <td>'+managers[i].createdAt+'</td>\
                        '+''+handel+'</tr>';
            }
            // $('#pagination').attr('count',oData.count);
            $('#tbody').html(allstr);
			//页码选择 分页
            // var allNum=$('#pagination').attr('count');
            // Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
             //    getManagerList(nowPage,pageSize,isEnable);
            // });
        }
    });
}



