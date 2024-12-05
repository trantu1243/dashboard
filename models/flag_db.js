const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const flagSchema = mongoose.Schema({
    service_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    round: {type: Number, required: true},
    flag: {type: String, required: true},
    check: {type:Boolean, default: false}
});

flagSchema.path('service_id').ref('sinhvien');


flagSchema.plugin(mongoosePaginate);
const flag = mongoose.model('flag', flagSchema);

module.exports = flag;