
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Team = require('../models/team');
const Flag = require('../models/flag');


const viewSubmit = (req, res) => {
    res.render('submit/submit', {error: null, success: null});
}

const submitFlag = async (req, res) => {
    try{
        const {token, flag} = req.body;
        const secretKey = process.env.SECRET_KEY;
    
        const payload = jwt.verify(token, secretKey);
    
        const now = Math.floor(Date.now() / 1000);
        if (now > payload.exp) {
            return res.render('submit/submit', {error: "Token hết hạn", success: null});
        }
    
        const team = await Team.findById(payload.id);
        if (!team) {
            return res.render('submit/submit', {error: "Token ko chính xác", success: null});
        }
        
        const checkFlag = await Flag.findOne({flag});

        if (!checkFlag) {
            return res.render('submit/submit', {error: "Flag ko chính xác", success: null});
        }
        if (checkFlag.check) {
            return res.render('submit/submit', {error: "Flag  đã đc nhập", success: null});
        }

        checkFlag.check =true;
        await checkFlag.save();
        team.score += 10;
        await team.save();
        return res.render('submit/submit', {error: null, success: "Success (+10)"});
    }
    catch (error) {
        return res.render('submit/submit', {error: error.message, success: null});
    }
   

}

module.exports = {
    viewSubmit, submitFlag
}