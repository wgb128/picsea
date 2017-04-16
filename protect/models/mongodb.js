var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/picsea');
exports.mongoose = mongoose;