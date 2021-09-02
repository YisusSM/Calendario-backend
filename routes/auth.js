/*Rutas de usuarios /AUTH
    host + /api/auth
*/

const { Router } = require('express');
const { validarCampos} = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { createUser,logInUser,reNew:revalidarToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/register',[ 

    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe ser de 6 caracteres').isLength({min:6}),
    validarCampos

 ], createUser);
router.post('/',
[ 
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe ser de 6 caracteres').isLength({min:6}),
    validarCampos
    
 ], logInUser );



router.get('/renew',validateJWT,revalidarToken );


module.exports = router;