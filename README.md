# picsea
## 无版权图片聚合站

爬取以下60多个免费正版图片站的内容：

[https://zhuanlan.zhihu.com/p/25980505?utm_source=com.unnoo.quan&utm_medium=social](https://zhuanlan.zhihu.com/p/25980505?utm_source=com.unnoo.quan&utm_medium=social)

做一个图片聚合网站，（初期）提供以下功能：

1. 多种条件筛选图片
2. 图片列表展示
3. 美图推荐（抓取各网站的推荐图片）


## 技术栈

前端：jquery、css

后端：nodejs、express、mongodb

## 数据库安装（做爬虫的需要）

先在本地安装mongodb，去官网下载：[https://www.mongodb.com/download-center#community](https://www.mongodb.com/download-center#community)

然后：

1. 根目录执行npm install，安装好需要的依赖包
2. 根目录下创建db目录，用于放置数据库文件
3. 执行npm run mongo，运行起本地服务器
4. 在命令行执行mongo，进入mongo命令行
5. 继续执行use picsea，创建数据库
6. 执行db.createCollection("counters")
7. 执行db.counters.save({_id: "picid", seq: 0})

数据库的初始化工作就完成了。保存完数据后，在mongo命令行执行db.pictures.find().pretty()进行查询


