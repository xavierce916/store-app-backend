const { response } = require("express");


const verifyUserPrivileges = ( req, res = response, next ) => {

    const { carOwnerUser, uid } = req;

        
        if ( carOwnerUser.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have privileges to edit this car'
            })
        }


    next();

}

module.exports = {
    verifyUserPrivileges
};