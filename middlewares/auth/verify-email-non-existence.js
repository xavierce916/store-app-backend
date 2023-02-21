const { response } = require("express");


const verifyEmailNonExistence = async ( req, res = response, next ) => {

    const { email } = req.body;
    const { User } = req;

    const user = await User.findOne({ email });
        
        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'There is no user with that email'
            });
        }
        
    req.uid = user.id;
    req.name = user.name;
    req.password = user.password;

    next();

}

module.exports = {
    verifyEmailNonExistence
};