window.onload = function () {
    var pageSize=10,nowPage=1;
    var searchtext = document.getElementById("isEnable").value;
    getManagerList(nowPage,document.getElementById("selectNum").value,document.getElementById("isEnable").value);

    //选择每页多少条
    Uiho.effect.selectNum(function(pageSize){
        getManagerList(nowPage,document.getElementById("selectNum").value,document.getElementById("isEnable").value)
    });
    //选择查询
    $('#SelectQueryBtn').on('click',function(){
        //alert(nowPage)
        // isEnable=$('#isEnable').val();
        //选择查询
        getManagerList(nowPage,document.getElementById("selectNum").value,document.getElementById("isEnable").value)
    });


}

function getManagerList(nowPage,pageSize,searchtext) {
    var queryCount = new Bmob.Query(Bmob.User);
    queryCount.equalTo("userType",0)
    var query = new Bmob.Query(Bmob.User);
    //查出管理员和高级管理员
    query.equalTo("userType",0);
    query.descending("createdAt");
    query.limit(pageSize);
    query.skip((nowPage-1)*pageSize)
    queryCount.count({
        success: function(count) {
            query.find({
                success: function(managers) {
                    debugger
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
                        var userType = managers[i].get("lastLoginTime");
                        userType = '普通用户'
                        debugger
                        handel='<td><div class="btn-group"><a href="showUserEdit.html?id='+managers[i].id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i>查看详情</a><a href="showManagerEdit.html?id='+managers[i].get("username")+'" class="btn btn-warning btn-sm deleteList"><i class="fa fa-times"></i>删除</a></div></td>';
                        allstr+='<tr><td>'+(i+1)+'</td><td>'+userType+'</td><td>'+managers[i].get("username")+'</td>\
                        <td>'+email+'</td><td>'+managers[i].get("mobilePhoneNumber")+'</td>\
                        <td>'+lastTime+'</td>\
                        <td>'+managers[i].createdAt+'</td>\
                        '+''+handel+'</tr>';
                    }
                    $('#tbody').html(allstr);
                    //页码选择 分页
                    $('#pagination').attr('count',count);
                    var allNum=$('#pagination').attr('count');
                    Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
                        getManagerList(nowPage,pageSize,searchtext);
                    });
                }
            });
        },
        error: function(error) {
            // 查询失败
        }
    });
}









