const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const flagSchema = mongoose.Schema({
    flag: {type: String, required: true},
    teamId: {type: mongoose.Schema.Types.ObjectId, required: true},
    check: {type:Boolean, default: false},
    round: {type:Number, required: true}
});

flagSchema.path('teamId').ref('team');

flagSchema.plugin(mongoosePaginate);
const Flag = mongoose.model('flag', flagSchema);

module.exports = Flag;