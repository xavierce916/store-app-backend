const { BuyerUser, SellerUser } = require("../../models/User");


const defineRoute = ( req, res = response, next ) => {

    const { baseUrl } = req;

    if ( baseUrl === '/api/auth/buyer' ) {

        req.secretSeed = process.env.SECRET_BUYER_JWT_SEED;
        req.userType = 'buyer';
        req.User = BuyerUser;
    }

    if ( baseUrl === '/api/auth/seller' ) {

        req.secretSeed = process.env.SECRET_SELLER_JWT_SEED;
        req.userType = 'seller';
        req.User = SellerUser;
    }


    next();

}


module.exports = {
    defineRoute
}