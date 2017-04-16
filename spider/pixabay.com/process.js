/*
抓取pixabay.com的数据
地址https://pixabay.com/zh/photos/?image_type=&cat=computer&min_width=&min_height=&q=%E7%A8%8B%E5%BA%8F%E5%91%98&order=popular

筛选条件：
筛选各个类别的图片
宽高大于480*240
横向
宽高比介于1.8~2.2之间

输出：
每条数据包含的字段：url、宽、高、tags数组

*/
var cheerio = require('cheerio');
var rp = require('request-promise');
var pictureDAO = require('../../protect/models/picture');
var options = {
    uri: 'http://www.google.com',
    transform: function (body) {
        return cheerio.load(body);
    }
};

//测试保存数据
/*var data = [
	{
	    width: 100,
	    height: 200,
	    url: 'https://pixabay.com/zh/%E9%95%BF%E9%A2%88%E9%B9%BF-%E9%87%8E%E7%94%9F%E5%8A%A8%E7%89%A9-%E6%B1%A1%E6%B8%8D-%E9%95%BF%E5%84%BF%E9%83%A8-%E5%8A%A8%E7%89%A9-%E9%9D%9E%E6%B4%B2-%E5%8A%A8%E7%89%A9%E5%9B%AD-%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9-2222908/',
	    tags: ['test', 'test2'],
	    origin: 'pixabay.com'

	},
	{
	    width: 300,
	    height: 200,
	    url: 'https://pixabay.com/zh/%E9%95%BF%E9%A2%88%E9%B9%BF-%E9%87%8E%E7%94%9F%E5%8A%A8%E7%89%A9-%E6%B1%A1%E6%B8%8D-%E9%95%BF%E5%84%BF%E9%83%A8-%E5%8A%A8%E7%89%A9-%E9%9D%9E%E6%B4%B2-%E5%8A%A8%E7%89%A9%E5%9B%AD-%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9-2222908/',
	    tags: ['test', 'test2'],
	    origin: 'pixabay.com'

	}
];
pictureDAO.saveAll(data, function(){
	console.log(1112)
})*/


rp(options)
.then(function ($) {
    // Process html like you would with jQuery...
})
.catch(function (err) {
    // Crawling failed or Cheerio choked...
});