var eventBus = new Vue();
var code;//声明一个变量用于存储生成的验证码
document.getElementById("code").onclick=changeImg;
function changeImg(){
    //alert("换图片");
    var arrays=new Array(
        '1','2','3','4','5','6','7','8','9','0',
        'a','b','c','d','e','f','g','h','i','j',
        'k','l','m','n','o','p','q','r','s','t',
        'u','v','w','x','y','z',
        'A','B','C','D','E','F','G','H','I','J',
        'K','L','M','N','O','P','Q','R','S','T',
        'U','V','W','X','Y','Z'
    );
    code='';//重新初始化验证码
    //alert(arrays.length);
    //随机从数组中获取四个元素组成验证码
    for(var i=0;i<4;i++){
        //随机获取一个数组的下标
        var r=parseInt(Math.random()*arrays.length);
        code+=arrays[r];
        //alert(arrays[r]);
    }
    //alert(code);
    document.getElementById('code').innerHTML=code;//将验证码写入指定区域
}

//效验验证码(表单被提交时触发)
function check(){
    //获取用户输入的验证码
    var input_code=document.getElementById('vcode').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    eventBus.$emit('eventBusName', 1);
    Bmob.User.logIn(username, password, {
        success: function(user) {
            // alert("登陆成功!");
            // if(input_code.toLowerCase()==code.toLowerCase())
            // {
            var d = new Date();
            var ss = d.toLocaleDateString()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();


            var User = Bmob.Object.extend("_User");
            var query = new Bmob.Query(User);

// 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
            query.get(user.id, {
                success: function(user) {
                    // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
                    var d = new Date();
                    var ss = d.toLocaleDateString()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
                    user.set('lastLoginTime',ss);
                    user.save();
                    //验证码正确(表单提交)
                    location.href="index.html";

                    // The object was retrieved successfully.
                },
                error: function(object, error) {
                    var er = error.message+error.code

                }
            });

            // }
            // else {
            //     alert("请输入正确的验证码!");
            //     //验证码不正确,表单不允许提交
            // }
            // Do stuff after successful login.
        },
        error: function(user, error) {
            // The login failed. Check error to see why.
            alert("用户名或密码输入错误!");
        }
    });
    // setTimeout(function(){location.href="main.html";},3000)

}