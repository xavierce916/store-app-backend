const jwt = require("jsonwebtoken");


const generateJWT = ( uid, name, secretSeed, userType ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid, name, userType };

        jwt.sign( payload, secretSeed, {
            expiresIn: '3h'
        } ,( err, token ) => {

            if ( err ) {
                console.log(err);
                reject('Failed to generate token');
            }

            resolve( token );

        })

    })

}


module.exports = {
    generateJWT
}