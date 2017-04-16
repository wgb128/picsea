var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 1 }
});

var Counter = mongodb.mongoose.model("Counter", CounterSchema);

var PictureSchema = new Schema({
	id: String,
    width: Number,
    height: Number,
    url: String,
    tags: Array,
    origin: String //来源网站，如pixabay.com
});
PictureSchema.pre('save', function(next) {
    var doc = this;
    Counter.findByIdAndUpdate({_id: 'picid'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.id = counter.seq;
        next();
    });
});
PictureSchema.set('toObject', { getters: true });

var Picture = mongodb.mongoose.model("Picture", PictureSchema);


var PictureDAO = function(){};
//保存图片
PictureDAO.prototype.save = function(obj, callback){
	var instance = new Picture(obj);
	instance.save(function(err){
		callback(err, null);
	});
}

//批量保存图片
PictureDAO.prototype.saveAll = function(arr, callback){
	console.log(arr)
	Picture.collection.insert(arr, function(err){
		callback(err, null);
	});
}

//更新图片
PictureDAO.prototype.update = function(obj, callback){
	Picture.findByIdAndUpdate(obj._id, obj, {}, function(err){
		callback(err, null);
	});
}

//获取图片列表
PictureDAO.prototype.list = function(pageNo, pageSize, callback){
	//如果只传入回调函数，则返回所有数据
	var arg = arguments[0];
	if(typeof arg == 'function'){
		Picture.find(function(err, pictures){
			arg(false, pictures);
		});
	}
	//否则返回分页数据
	else{
		Picture.count(function(err, count){
			Picture.find({}, null, {skip: (pageNo-1)*pageSize, limit: pageSize, sort: {'id': 1} }, function(err, pictures){
				callback(false, {pictures: pictures, total: count, pageNo: pageNo});
			});
		});
	}
	
}

//根据id获取图片
PictureDAO.prototype.get = function(id, callback){
	Picture.find({id: id}, function(err, pictures){
		if(pictures.length){
			callback(false, pictures[0]);
		}
		else{
			callback('查找不到数据！');
		}
	})
}

//删除图片
PictureDAO.prototype.remove = function(id, callback){
	Picture.remove({id: id}, function(err){
		callback(err, null);
	})
}

module.exports = new PictureDAO();
