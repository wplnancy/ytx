
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


var map = new AMap.Map('address', {
    resizeEnable: true,
    zoom:11,
    center: [116.397428, 39.90923]
});

var marker = new AMap.Marker({
    position: map.center,
    map:map
});


AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){
    var toolBar = new AMap.ToolBar();
    var scale = new AMap.Scale();
    map.addControl(toolBar);
    map.addControl(scale);
});
