const { response } = require("express");
const Car = require("../../models/Car");


const verifyCarExistence = async ( req, res = response, next ) => {

    const carId = req.params.id;

    try {
        
        const car = await Car.findById( carId );
    
        if ( !car ) {
            return res.status(404).json({
                ok: false,
                msg: 'there is no car with that id'
            })
        }

        req.carOwnerUser = car.carOwnerUser;

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });

    }
    


    next();

}

module.exports = {
    verifyCarExistence
};