$(document).ready(function(){

	// choose
	$(".chs-head>div").click( function(){
		var index=$(this).index();
		$(this).addClass("select").siblings().removeClass("select");
		$(".chs-list").addClass("show").eq(index).siblings(".chs-list").removeClass("show");
	});


	// 1
	$(".seltype").on("change",function(){
		$(".chs-field p span").text($(this).children('option:selected').text());
	});

	// 回到顶部
	$("#returnTop").click(function () {
        var speed=200;
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
 });

})