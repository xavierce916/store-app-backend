const { response } = require("express");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");
const { BuyerUser, SellerUser } = require("../models/User");

const createUser = async (req, res = response ) => {

    const { secretSeed, userType } = req;
    const { password } = req.body;

    try {
        
        let user;

        if( userType === 'buyer' ) {
            user = new BuyerUser( req.body );
        }

        if( userType === 'seller' ) {
            user = new SellerUser( req.body );
        }

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        // Generar JWT
        const token = await generateJWT( user.id, user.name, secretSeed, userType );


        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            userType,
            token
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });

    }
}

const loginUser = async (req, res = response) => {

    const { secretSeed, userType } = req;
    const { uid, name } = req;

    try {
        
        // Generar JWT
        const token = await generateJWT( uid, name, secretSeed, userType );


        res.json({
            ok: true,
            uid,
            name,
            userType,
            token
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });

    }

}

const revalidateToken = async (req, res) => {

    const { secretSeed, userType } = req;
    const { uid, name } = req;

    const token = await generateJWT( uid, name, secretSeed, userType ); 

    res.json({
        ok: true,
        uid,
        name,
        userType,
        token
    });

}


module.exports = {
    createUser,
    loginUser,
    revalidateToken
}