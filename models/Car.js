const { Schema, model } = require('mongoose');
const { categories, brands, models } = require('../data/cars');


const CarSchema = new Schema({

    category: {
        type: String,
        required: true,
        enum: categories
    },

    brand: {
        type: String,
        required: true,
        enum: brands
    },

    model: {
        type: String,
        required: true,
        enum: models
    },

    year: {
        type: Number,
        required: true,
        range: [ 1990, 2023 ]
    },

    price: {
        type: Number,
        required: true,
        range: [ 2000, 500000 ]
    },
    
    mileage: {
        type: Number,
        required: true,
        range: [ 0, 500000 ]
    },

    carOwnerUser: {
        type: Schema.Types.ObjectId,
        ref: 'SellerUser',
        required: true
    }

});

CarSchema.method( 'toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;

})

module.exports = model( 'Car', CarSchema );

