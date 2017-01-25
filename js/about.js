/**
 * Created by Administrator on 2016/9/22.
 */
$("#myTab a").on("click",function(){
     $(this).addClass("active").siblings("a").removeClass("active");

});
$("#myTab a").on("mouseenter",function(){
    $(this).addClass("active1").siblings("a").removeClass("active1");

}).on("mouseout",function(){
    $(this).removeClass("active1");
});

$('#myTab a:last').tab('show');
$('#summary a').tooltip(
    { "show": 500, "hide": 100 }
);

//地图的应用

var map = new AMap.Map('address', {
    resizeEnable: true,
    zoom:11,
    center: [116.397428, 39.90923]
});

var marker = new AMap.Marker({//创建标记
    position: map.center,//设置标记位置
    map:map//设置map属性，使得标记能被立即添加到地图上
});
//marker.setMap();移除点标记

<!--添加工具条和比例尺子-->
AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){//加载工具条和比例尺两个插件放到数组中
    var toolBar = new AMap.ToolBar();//在回调函数里进行控件的生成和添加
    var scale = new AMap.Scale();
    map.addControl(toolBar);
    map.addControl(scale);
});
//map.removeControl(toolBar);移除控件