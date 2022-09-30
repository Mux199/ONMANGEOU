const UserModel = require("../models/user.model");

//signup user 
module.exports.signUp = async (req, res) => {
    const{email, password} = req.body

    try {
        const user = await UserModel.create({email, password});
        res.status(201).json({user: user})
    }
};
