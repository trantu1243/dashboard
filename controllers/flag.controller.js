const Flag = require("../models/flag");

const createFlag = async (req, res) => {
    try {
        const existingflag = await Flag.findOne({flag: req.body.flag});
        if (existingflag) {
            return res.render('flag/add', {error: "Đội đã tồn tại", success: null});
        }
        const flag = Flag.create({flag: req.body.flag});
        res.render('flag/add', {error: null, success: "Thêm thành công"});
    } catch (error) {
        res.render('flag/add', {error: error.message, success: null});
    }
}


const getFlags = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const flags = await Flag.paginate({}, { page, limit }, function (err, result) {
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
    createFlag,
    getFlags,
    deleteFlag
}
