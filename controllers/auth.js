const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt');
const {response} = require('express');
const User = require('../models/User');

//Registro de Usuario
const createUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'email already in use'
            });

        }

        user = new User(req.body);
        //encrypt password
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
        user.password = bcrypt.hashSync(password, salt);

        console.log(user);
        await user.save();
        console.log(user);
        //generate jwt
        
        const token = await generateJwt(user.id, user.name);
        console.log(token);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};


//Login de Usuario
const logInUser = async (req, res = response) => {
    const { email, password } = req.body;
    console.log("entra");
    try {

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'user doesnt exist'
            });

        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'User or Password Incorrect'
            });
        }

        //Generar JWT
        
        const token = await generateJwt(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            password2: user.password,
            msg: 'success',
            token,
            email,
            password
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


};

const reNew = async(req, res = response) => {

    const {uid,name} = req;


    const token = await generateJwt(uid, name);
    res.json({
        ok: true,
        uid,
        name,
        token
    })
};

module.exports = {
    createUser,
    logInUser,
    reNew
}