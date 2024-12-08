const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const flagSchema = mongoose.Schema({
    flag: {type: String, required: true},
    check: {type:Boolean, default: false}
});

flagSchema.plugin(mongoosePaginate);
const Flag = mongoose.model('flag', flagSchema);

module.exports = Flag;