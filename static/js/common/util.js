/*
通用工具方法
*/
var util = (function($){
	return {
		//封装通用的ajax请求，提供默认值，显示loading，判断返回结果
		ajax: function(config){

		},
		/*获取变量类型，返回字符串，规则如下
		字符串=>'string'
		数字=>'number'
		数组=>'array'
		普通对象=>'object'
		函数=>'function'
		*/
		getType: function(arg){

		},
		//返回顶部
		goTop: function(){

		},
		/*
		本地存储的兼容方法
		先检查是否支持localStorage，如果支持则调用localStorage的方法，否则调用cookie
		*/
		setStorage: function(key, value){

		},
		/*
		获取本地存储的数据，兼容方式同setStorage
		*/
		getStorage: function(key){

		}
	}
	

})(jQuery);