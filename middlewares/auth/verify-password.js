const { response } = require("express");
const bcrypt = require('bcryptjs');


const verifyPassword = async ( req, res = response, next ) => {

    const { password } = req.body;

    const { password: storedPassword } = req;

    const validPassword = bcrypt.compareSync( password, storedPassword );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'incorrect password'
            });
        }


    next();

}

module.exports = {
    verifyPassword
};