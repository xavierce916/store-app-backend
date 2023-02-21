/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const { createUser, loginUser, revalidateToken } = require("../controllers/auth");
const { defineRoute } = require("../middlewares/auth/define-route");
const { validateBuyerJWT } = require("../middlewares/auth/validate-buyer-jwt");
const { validateFields } = require("../middlewares/auth/validate-fields");
const { verifyEmailExistence } = require("../middlewares/auth/verify-email-existence");
const { verifyEmailNonExistence } = require("../middlewares/auth/verify-email-non-existence");
const { verifyPassword } = require("../middlewares/auth/verify-password");


router.post(
    '/new', 
    [
        check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
        check( 'email', 'Debe ser un mail válido' ).isEmail(),
        check( 'password', 'La contraseña debe tener al menos 6 caracteres' ).isLength({ min: 6 }),
        defineRoute,
        validateFields,
        verifyEmailExistence,
    ], 
    createUser );

router.post(
    '/',
    [
        check( 'email', 'Debe ser un mail válido' ).isEmail(),
        check( 'password', 'La contraseña debe tener al menos 6 caracteres' ).isLength({ min: 6 }),
        defineRoute,
        validateFields,
        verifyEmailNonExistence,
        verifyPassword,
    ], 
    loginUser );

router.get('/renew', [ defineRoute, validateBuyerJWT ] ,revalidateToken);


module.exports = router;