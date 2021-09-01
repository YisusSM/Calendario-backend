const { response } = require('express');
const { validationResult } = require('express-validator');


const validarCampos = (req, res = response, next) => {
    //manejo de erroes

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}

const dateStartAndEnd = (value, { req }) => {
    
    const { start, end } = req.body;
    const mStart = moment(start);
    const mEnd = moment(end);
     console.log(mStart,mEnd);
    if (mStart.isBefore(mEnd)) {
        return true;
    } else {
        return  res.status(400).json({
            ok: false,
            errors: 'fecha de inicio tiene que ser menor a la de fin'
        });
    }

}

module.exports = {
    validarCampos,
    dateStartAndEnd
}