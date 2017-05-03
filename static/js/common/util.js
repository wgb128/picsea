/*
通用工具方法
*/
var util = (function ($) {
  return {
    //封装通用的ajax请求，提供默认值，显示loading，判断返回结果
    ajax: function (config) {
      $.ajax({
        type: config.type || 'GET',
        url: config.url || '',
        data: config.data || {},
        dataType: config.dataType || 'json',
        async: config.async || true,
        beforeSend: function () {
          // Loading...
        },
        success: function (res) {
          // Close loading animation
          if (config.success) {
            config.success(res)
          } else {
            // Do something...
          }
        },
        error: function (err) {
          // Close loading animation
          if (config.error) {
            config.error(err)
          } else {
            // Do something...
          }
        }
      })
    },
    /*获取变量类型，返回字符串，规则如下
    字符串=>'string'
    数字=>'number'
    数组=>'array'
    普通对象=>'object'
    函数=>'function'
    */
    getType: function (arg) {
      var type = typeof arg
      if (type === 'object') {
        type = arg.constructor === Array ? 'array' : 'object'
      }
      return type
    },
    //返回顶部
    goTop: function(){
      document.documentElement.scrollTop = document.body.scrollTop = 0
    },
    /*
    本地存储的兼容方法
    先检查是否支持localStorage，如果支持则调用localStorage的方法，否则调用cookie
    */
    setStorage: function(key, value){
      if (window.localStorage) {
        window.localStorage.setItem(key, value)
      } else {
        document.cookie = key + '=' + value
      }
    },
    /*
    获取本地存储的数据，兼容方式同setStorage
    */
    getStorage: function(key){
      if (window.localStorage) {
        window.localStorage.getItem(key)
      } else {
        var arr
        var regExp = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
        if (document.cookie.match(regExp)) {
          arr = document.cookie.match(regExp)
          return decodeURI(arr[2])
        }
        return null
      }
    }
  }
})(jQuery)
