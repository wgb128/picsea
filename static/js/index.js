$(document).ready(function(){
	// 1
	$(".seltype").on("change",function(){
		$(".ChooseSeltype span").text($(this).children('option:selected').text());
	});

	// 2
	$(".selstyle").on("change",function(){
		$(".ChooseSelstyle span").text($(this).children('option:selected').text());
	});
})