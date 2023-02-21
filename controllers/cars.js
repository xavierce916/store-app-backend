const { response } = require("express");
const Car = require("../models/Car");



const getCars = async ( req, res = response ) => {

    const cars = await Car.find().populate( 'carOwnerUser', 'name' );

    res.json({
        ok: true,
        cars
    });

}

const getCarsByUser = async ( req, res = response ) => {
    
    const { uid } = req;

    const cars = await Car.find({ carOwnerUser: uid }).populate( 'carOwnerUser', 'name' );

    res.json({
        ok: true,
        cars
    });

}        

const createCar = async ( req, res = response ) => {

    const car = new Car( req.body );

    try {

        car.carOwnerUser = req.uid;
        
        const savedCar = await car.save();

        res.json({
            ok: true,
            car: savedCar
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        })

    }

}

const updateCar = async ( req, res = response ) => {

    const carId = req.params.id;
    const { uid } = req;

    try {
        
        const newCar = { ...req.body, carOwnerUser: uid };

        const carUpdated = await Car.findByIdAndUpdate(
            carId, 
            newCar, 
            { new: true } 
        );

        res.json({
            ok: true,
            car: carUpdated
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        })

    }

}

const deleteCar = async ( req, res = response ) => {

    const carId = req.params.id;

    try {
        
        const deletedCar = await Car.findByIdAndDelete( carId );

        res.json({
            ok: true,
            car: deletedCar
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        })

    }

}

const deleteCars = async ( req, res = response ) => {

    const carIds = req.params.ids.split(',');

    try {
        
        const deletedCars = await Car.deleteMany({ _id: { $in: carIds }});

        res.json({
            ok: true,
            cars: deletedCars
        })

    } catch (error) {        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        })

    }

}

module.exports = {
    getCars,
    getCarsByUser,
    createCar,
    updateCar,
    deleteCar,
    deleteCars
}
