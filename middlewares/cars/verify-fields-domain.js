const { response } = require("express");
const { categories, brands, models } = require("../../data/cars");


const verifyFieldsDomain = (req, res = response, next) => {

    const { category, brand, model } = req.body;

    const validate = categories.includes( category ) 
    && brands.includes( brand ) 
    && models.includes( model )

    if ( !validate ) {
        return res.status(400).json({
            ok: false,
            msg: 'one of the fields is outside the domain'
        })
    }

    next();

};

module.exports = {
    verifyFieldsDomain
};