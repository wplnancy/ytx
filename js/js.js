/**
 * Created by Administrator on 2016/9/22.
 */
    //广告的显示和关闭
setTimeout(function(){
    $(".ad")
        .slideDown("normal")
        .slideUp("slow")
        .fadeIn(1000)
        .children("span").click(function () {
            $(this).parent().fadeOut();
        });

},1000);



var timer=null,timer2=null;
var iNow=0;//用来控制播放的张数
    // 根据ol下li的索引号，匹配ul下相对应li的索引号
    $(".wrapper ol li").mouseenter(function () {
        var that=this;
        clearTimeout(timer2);
        clearInterval(timer);
        var timer2=setTimeout(function(){
            $(that).addClass("current").siblings().removeClass("current");
            $(".wrapper ul li").eq($(that).index()).fadeIn("normal").siblings().fadeOut("normal");
            iNow=$(that).index();
        },1000);
    }).mouseout(function(){
        clearTimeout(timer2);
    });
    $(".wrapper").mouseenter(function(){
        clearInterval(timer);
        clearTimeout(timer2);
    });
    $(".wrapper").mouseout(function(){
        clearTimeout(timer2);
        clearInterval(timer);
        timer=setInterval(autoPlay,3000);
    });
    timer=setInterval(autoPlay,3000);
    function autoPlay()
    {
        iNow=++iNow>$(".wrapper ol li").size()?iNow=0:iNow++;
        //这里就不要考虑前后的问题了,直接是兄弟元素
        $(".wrapper ol li").eq(iNow).addClass("current").siblings().removeClass("current");
        $(".wrapper ul li").eq(iNow).fadeIn("normal").siblings().fadeOut("normal");
    }





//tab栏的切换函数的封装
function tab(obj){
    var target = document.getElementById(obj);
    var spans = target.getElementsByTagName("span");
    var lis = target.getElementsByTagName("li");
    for(var i=0;i<spans.length;i++)
    {
        var otimer = null;
        spans[i].onmouseover =  function (num) {
            return function(){
                clearTimeout(otimer);
                otimer = setTimeout(function(){
                    for(var j=0; j<spans.length;j++)
                    {
                        spans[j].className = "";
                        lis[j].className = "";
                    }
                    spans[num].className = "current";
                    lis[num].className = "show";
                },100);

            }
        }(i);
        spans[i].onmouseout = function() {
            clearTimeout(otimer);//当鼠标移开的时候也要清除定时器
        }
    }
}
//调用函数
tab("one");

