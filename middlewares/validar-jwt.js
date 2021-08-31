const { response } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');




const validateJWT = (req, res = express.response, next) => {

    // header x-token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "no hay token en la petición"
        });
    }
    try {

        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = payload.uid;
        req.name = payload.name;

        // console.log(payload);


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    next();

}

module.exports = {
    validateJWT
}