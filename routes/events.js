/*
    Event route
    /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos')
const { validateJWT } = require('../middlewares/validar-jwt')
const { getEvent, createEvent, updateEvent, deleteEvent } = require("../controllers/events");

const router = Router();
router.use(validateJWT);


//Obtener eventos
router.get('/', getEvent);

//Crear evento

router.post('/', [
    check('title', 'el titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom(isDate),
    check('end', 'Fecha fin no puede ser menor a la de inicio').custom(isDate),
    validarCampos
], createEvent);


//actualizar evento
router.put('/:id',[
    check('title', 'el titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom(isDate),
    check('end', 'Fecha fin no puede ser menor a la de inicio').custom(isDate),
    validarCampos
], updateEvent);

//delete event
router.delete('/:id', deleteEvent);

module.exports = router;