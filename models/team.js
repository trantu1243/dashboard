const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const teamSchema = mongoose.Schema({
    service_id: {type: String, required: true},
    token: {type: String},
    name: {type: String, required: true},
    score: {type: Number, default: 0},
    interruptionTime: {type: Number, default: 0},
    interruption: {type: Number, default: 0},
});


teamSchema.plugin(mongoosePaginate);
const Team = mongoose.model('team', teamSchema);

module.exports = Team;