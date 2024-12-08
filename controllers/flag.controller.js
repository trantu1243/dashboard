const Flag = require("../models/flag");
const Team = require("../models/team");

const showAddFlag = async (req, res) => {
    const teams = await Team.find();
    res.render('flag/add', {error: null, success: null, teams});
}

const createFlag = async (req, res) => {
    const teams = await Team.find();

    try {
        const existingflag = await Flag.findOne({flag: req.body.flag});
        if (existingflag) {
            return res.render('flag/add', {error: "Flage đã tồn tại", success: null, teams});
        }
        const team = await Team.findById(req.body.teamId);
        if (existingflag) {
            return res.render('flag/add', {error: "Đội ko tồn tại", success: null, teams});
        }
        const flag = Flag.create({flag: req.body.flag, teamId: team, round: req.body.round});
        res.render('flag/add', {error: null, success: "Thêm thành công", teams});
    } catch (error) {
        res.render('flag/add', {error: error.message, success: null, teams});
    }
}


const getFlags = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const flags = await Flag.paginate({}, { 
        page, 
        limit,
        populate: {
            path: 'teamId',
            select: 'name',
        },
    }, function (err, result) {
        return result;
    });
    res.render('flag/index', { flags });
};

const deleteFlag = async (req, res) => {
    try{
        await Flag.findByIdAndDelete(req.params.id);
        res.redirect("/flag");
    } catch (error) {
        console.log(error);
    }
}


// const submitflag = async (token,flag_content) =>{
//     const Flag= await flag.findOne({ token: token })
//     if(Flag){
//         const Flag = await flag.findOne({flag:flag_content,check:false})
//         if(Flag){
//             Flag.score +=10
//             Flag.check =true
//             await Flag.save()
//             await Flag.save()
//         }
//     }
    

// }

module.exports = {
    showAddFlag,
    createFlag,
    getFlags,
    deleteFlag
}
