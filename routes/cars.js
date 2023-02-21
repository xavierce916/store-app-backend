const { Router } = require("express");
const { check } = require("express-validator");
const { createCar, updateCar, getCars, deleteCar, getCarsByUser, deleteCars } = require("../controllers/cars");
const { isMileage } = require("../helpers/isMileage");
const { isPrice } = require("../helpers/isPrice");
const { isYear } = require("../helpers/isYear");
const { validateBuyerJWT } = require("../middlewares/auth/validate-buyer-jwt");
const { validateFields } = require("../middlewares/auth/validate-fields");
const { validateSellerJWT } = require("../middlewares/auth/validate-seller-jwt");
const { verifyCarExistence } = require("../middlewares/cars/verify-car-existence");
const { verifyCarsExistence } = require("../middlewares/cars/verify-cars-existence");
const { verifyFieldsDomain } = require("../middlewares/cars/verify-fields-domain");
const { verifyUserPrivileges } = require("../middlewares/cars/verify-user-privileges");



const router = Router();

// // Todas deben pasar por la validación del JWT
// router.use(validateBuyerJWT);

// Obtener carro
router.get('/', getCars);

// Obtener carro por usuario 
router.get('/user', validateSellerJWT ,getCarsByUser);

// Crear un nuevo carro
router.post(
    '/',
    [
        validateSellerJWT,
        check('category', 'category is required').not().isEmpty(),
        check('brand', 'brand is required').not().isEmpty(),
        check('model', 'model is required').not().isEmpty(),
        check('year', 'year is required').custom( isYear ),
        check('price', 'price is required').custom( isPrice ),
        check('mileage', 'mileage is required').custom( isMileage ),
        validateFields
    ],
    createCar
);

// Actualizar carro
router.put(
    '/:id',
    [
        validateSellerJWT,
        check('category', 'category is required').not().isEmpty(),
        check('brand', 'brand is required').not().isEmpty(),
        check('model', 'model is required').not().isEmpty(),
        check('year', 'year is required').custom( isYear ),
        check('price', 'price is required').custom( isPrice ),
        check('mileage', 'mileage is required').custom( isMileage ),
        validateFields,
        verifyCarExistence,
        verifyFieldsDomain,
        verifyUserPrivileges
    ],
    updateCar
);

// Borrar carro
router.delete(
    '/:id',
    [
        validateSellerJWT,
        verifyCarExistence,
        verifyUserPrivileges
    ],
    deleteCar
);

// Borrar carros
router.delete(
    '/delete/:ids',
    [
        validateBuyerJWT,
        verifyCarsExistence
    ],
    deleteCars
);

module.exports = router;