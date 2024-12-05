const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    service_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    token: {type: String, required: true},
    name: {type: String, required: true},
    score: {type: Number, default: 0}
});



const team = mongoose.model('team', teamSchema);

module.exports = team;