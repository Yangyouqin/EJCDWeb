window.onload = function () {
    var query = new Bmob.Query(Bmob.User);
    //查出管理员和高级管理员
    query.equalTo("userType",0);
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
                handel='<td><div class="btn-group"><a href="showManagerEdit.html?id='+managers[i].id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i>查看详情</a><a href="showManagerEdit.html?id='+managers[i].get("username")+'&realname='+managers[i].get("username")+'&job='+managers[i].get("username")+'&phone='+managers[i].get("username")+'&tel='+managers[i].get("username")+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i>删除</a></div></td>';
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



$(function(){
	var pageSize=10,isEnable='',nowPage=1;
	getManagerList(nowPage,pageSize,isEnable);

	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getManagerList(nowPage,pageSize,isEnable)
	});
	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		isEnable=$('#isEnable').val();
		//选择查询
		getManagerList(nowPage,pageSize,isEnable)
	});
});

//获取列表
function getManagerList(nowPage,pageSize,isEnable){
	$.ajax({
		url:requrl,
		type:"POST",
		data:'data={"action": "getManagerList","params": {"isEnable":"'+isEnable+'","nowPage": '+nowPage+',"pageSize":'+pageSize+'}, "source": "web", "target": "manager" }',
		beforeSend:function(){
			$('#tbody').html('<tr><th colspan="8">加载中,请稍后...</th></tr>');
		},
		success:function(str){
			var oData=$.parseJSON(str);
			var allstr='';
			if(oData.responseCode==1){
				$('#tbody').removeClass('error');
				var cookieValue=$.parseJSON(Uiho.cookies.getCookie('userinfo'));

				for(var i=0; i<oData.object.length; i++){

					//console.log();
					var userStatusHtml='',
						handel='';
					if(cookieValue.role==2){
						userStatusHtml='';
						handel='';
						$('#userstatuss').remove();
						$('#handle').remove();
					}else{
						//isEnable --> 1启用 ， 0禁用
						if(oData.object[i].isEnable==1){
							userStatusHtml='<td><button userId="'+oData.object[i].id+'"  isEnable="'+oData.object[i].isEnable+'" class="btn btn-success userstatus" ><i class="fa fa-gear"></i>&nbsp;禁用</button></td>';
						}else{
							userStatusHtml='<td><button userId="'+oData.object[i].id+'"  isEnable="'+oData.object[i].isEnable+'" class="btn btn-default userstatus"><i class="fa fa-gear"></i>&nbsp;启用</button></td>';
						};
						handel='<td><div class="btn-group"><a href="showManagerEdit.html?id='+oData.object[i].id+'&realname='+oData.object[i].realname+'&job='+oData.object[i].jobDesc+'&phone='+oData.object[i].phone+'&tel='+oData.object[i].tel+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i>查看详情</a></div></td>';
					};
					//dom
					allstr+='<tr><td>'+oData.object[i].jobDesc+'</td><td>'+oData.object[i].realname+'</td>\
                        <td>'+oData.object[i].phone+'</td><td>'+oData.object[i].tel+'</td>\
                        <td>'+Uiho.tool.DetailTimesTamp(oData.object[i].createTime)+'</td>\
                        <td>'+Uiho.tool.DetailTimesTamp(oData.object[i].updateTime)+'</td>\
                        '+userStatusHtml+''+handel+'</tr>';
				};
				$('#pagination').attr('count',oData.count);
				$('#tbody').html(allstr);


				
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getManagerList(nowPage,pageSize,isEnable);
				});

			}else{
				$('#tbody').html('<tr><td colspan="8" align="center">获取失败,请重试！</td></tr>').addClass('error');
			}
		},
		complete:function(str){
			ChangeStatus();
		}
	});
}
// 启用禁用管理员操作
function ChangeStatus(){
	$('.userstatus').on('click',function(){
		var _this=$(this);
		var status=$(this).attr('isEnable');//禁用启用状态
		var userId=$(this).attr('userId');//userid="5" 用户id
		if(status==1){
			Disable(userId,_this);
		}else if(status==0){
			Enable(userId,_this)
		}
	});
};
//禁用
function Disable(userId,_this){
	$.ajax({
		url:requrl,
		type:"POST",
		data:'data={ "action":"disableOneManager","params":'+userId+',"source":"web","target":"manager"}',
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData);
			if(oData.responseCode==1){
				alert(oData.responseMsg);
				_this.removeClass('btn-success');
				_this.addClass('btn-default');
				_this.attr('isenable','0');
				_this.html('<i class="fa fa-gear"></i>&nbsp;启用');
			}else{
				alert('操作失败！');
			}
		},
		complete:function(){}
	});
}
//启用
function Enable(userId,_this){
	$.ajax({
		url:requrl,
		type:"POST",
		data:'data={ "action":"enableOneManager","params":'+userId+',"source":"web","target":"manager"}',
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData);
			if(oData.responseCode==1){
				alert(oData.responseMsg);
				_this.removeClass('btn-default');
				_this.addClass('btn-success');
				_this.html('<i class="fa fa-gear"></i>&nbsp;禁用');
				_this.attr('isenable','1');
			}else{
				alert('操作失败！');
			}
		},
		complete:function(){}
	});
}


//Enable 启用






