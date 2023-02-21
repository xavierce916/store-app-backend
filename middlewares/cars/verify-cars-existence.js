const { response } = require("express");
const Car = require("../../models/Car");


const verifyCarsExistence = async ( req, res = response, next ) => {

    const carIds = req.params.ids.split(',');
    
    try {
        
        const cars = await Car.find( { _id: { $in: carIds } } );
        
        if ( !(cars.length === carIds.length) || !cars ) {
            return res.status(404).json({
                ok: false,
                msg: 'there are no cars with that ids'
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });

    }
    


    next();

}

module.exports = {
    verifyCarsExistence
};