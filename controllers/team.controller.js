const Team = require("../models/team");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getTeams = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const teams = await Team.paginate({}, { page, limit }, function (err, result) {
        return result;
    });
    res.render('team/index', { teams });
};

const createTeam = async (req, res) => {
    try {
        const { service_id, name } = req.body;
        const existingteam = await Team.findOne({service_id});
        if (existingteam) {
            return res.render('team/add', {error: "Đội đã tồn tại", success: null});
        }
        const team = Team.create({service_id, name})
        res.render('team/add', {error: null, success: "Thêm thành công"});
    } catch (error) {
        res.render('team/add', {error: error.message, success: null});
    }
}

const generateToken = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);

        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({ id: team.id }, secretKey, { expiresIn: '24h' })

        team.token = token;
        await team.save();

        res.render('team/edit', { team, error: null, success: null });
    }
    catch (error) {
        console.log(error);
        res.redirect(`/team/edit/${req.params.id}`, {error: error.message, success: null});
    }
}

const deleteTeam = async (req, res) => {
    try{
        await Team.findByIdAndDelete(req.params.id);
        res.redirect("/team");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getTeams,
    createTeam,
    deleteTeam,
    generateToken
}