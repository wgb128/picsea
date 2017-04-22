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
var pictureDAO = require('../../protect/models/picture');
var cheerio = require('cheerio');
var rp = require('request-promise');
var P = require('bluebird');
rp(urlOptions('https://pixabay.com/zh/photos/?min_height=240&orientation=horizontal&image_type=&cat=&q=&min_width=480&order=popular&pagi='))
.then(function($) {
    var pagesUrlArr=[]
    var pages=parseInt($("form[class='add_search_params pure-form hide-xs hide-sm hide-md']").text().substr(($("form[class='add_search_params pure-form hide-xs hide-sm hide-md']").text().indexOf('/')+2)))
    for(var i=1;i<=pages;i++){
        pagesUrlArr.push('https://pixabay.com/zh/photos/?min_height=240&orientation=horizontal&image_type=&cat=&q=&min_width=480&order=popular&pagi='+i)
    }
    return pagesUrlArr
})
.then(function(pagesUrlArr) {
    console.log('total:', pagesUrlArr.length + ' 时间:' + new Date().toLocaleString());
        P.mapSeries(group(pagesUrlArr, 2),(smallArrOfPage)=>{
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('现在在检测'+smallArrOfPage)
                    resolve(crawler(smallArrOfPage));
                }, 150*1000);
        });
      
       
        })
})
.catch(function(err) {
    console.log('获取图片总数遇到错误，错误为', err)
})

function urlOptions(uri) {
    var options = {
        method: 'GET',
        uri: uri,
        headers: {
            'User-Agent': getUA(),
            'Accept-Language': 'zh-CN,zh;q=0.8'
        },
        transform: function(body) {
            return cheerio.load(body);
        }
    };
    return options
}
function getUA(){
    var UA=[
    'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
    'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0',
    'Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1',
    'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Maxthon 2.0)',
    'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; 360SE)',
    'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
    'Mozilla/4.0 (compatible; MSIE 6.0; ) Opera/UCWEB7.0.2.37/28/999',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
    ]
    return UA[Math.floor(Math.random() * (UA.length))]
}
function getDetail(picUrl){
    var picDetails={}
    return new Promise(function(resolve,reject) {
        setTimeout(function(){
            rp(urlOptions(picUrl)).then(function($,err){
        if(err){
            reject('err')
        }else{
            var tags=$("img[itemprop]").attr('alt').split(',')
            var pixel
            var width
            var height
            $("#details th").each(function() {
                if ($(this).text() == '解析度') {
                    pixel = $(this).next().text()
                    width = parseInt(pixel.split('×')[0])
                    height = parseInt(pixel.split('×')[1])
                } })
            if(width/height>1.7&&width/height<2.3){
                picDetails.width=width
                picDetails.height=height
                picDetails.url=picUrl
                picDetails.tags=tags
                picDetails.origin='pixabay.com'
                resolve(picDetails)
                
            }else{
                resolve(0)
            }
        }
    })
        },40*1000)
    
    })
}
function getPicsOfSinglePage($){
    var picsOfSinglePage = [] 
    $(".flex_grid").children().children("a").each(function() {
        picsOfSinglePage.push('https://pixabay.com' + $(this).attr('href') ) 
    }) 
    console.log(`获取页面图片列表完成, 总共有${picsOfSinglePage.length}条数据`)
    return picsOfSinglePage
}
function group(array, subGroupLength) {
    var index = 0;
    var newArray = [];

    while(index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
    }

    return newArray;
}
function crawler(smallArrOfPage){
    console.log('现在数组中有'+smallArrOfPage)
    Promise.all(smallArrOfPage.map((url) => {
        rp(urlOptions(url))
            .then(function($){
                console.log('now it is:',url)
                return $
            })
            .delay(50*1000)
            .then(function($){
                return getPicsOfSinglePage($)
            })
            .then(function(bigArr){
                for(var smallArr of group(bigArr,20)){
                    Promise.all(smallArr.map((url) => getDetail(url))).then((res) =>{
                        data=res.filter(item => item !== 0)
                        pictureDAO.saveAll(data, function(){
                            console.log(`${Object.keys(data).length}条数据 saved`)
                        })
                    })
                }
            })
            .delay(50*1000)
            .catch(function(err){
                console.log('获取页面图片列表遇到错误，错误为'+ err)
            })
    }))
}
