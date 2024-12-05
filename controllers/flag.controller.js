const flag = require("../models/flag_db");
const team = require("../models/team");


const createflag = async (flagBody) => {
    return flag.create(flagBody);
}

const submitflag = async (token,flag_content) =>{
    const Team= await team.findOne({ token: token })
    if(Team){
        const Flag = await flag.findOne({flag:flag_content,check:false})
        if(Flag){
            Team.score +=10
            Flag.check =true
            await Team.save()
            await Flag.save()
        }
    }
    

}

module.exports = {
    createflag,
    submitflag
}
