const { response } = require("express");


const verifyEmailExistence = async ( req, res = response, next ) => {

    const { email } = req.body;
    const { User } = req;

    const user = await User.findOne({email});
        
        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'An user exists with that email'
            })
        }

    next();

}

module.exports = {
    verifyEmailExistence
};