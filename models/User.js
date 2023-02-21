const { Schema, model } = require('mongoose');

const userTypes = [ 'buyer', 'seller' ];

const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    // userType: {
    //     type: String,
    //     required: true,
    //     enum: userTypes 
    // },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }

});



const BuyerUser = model( 'BuyerUser', UserSchema );
const SellerUser = model( 'SellerUser', UserSchema );

module.exports = {
    BuyerUser,
    SellerUser
}
