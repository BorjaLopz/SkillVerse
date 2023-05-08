const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const { generateError } = require('../helpers');

const loginController = async (req, res, next) => {
    try {


        //utilizamos validador de JOI
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            throw generateError(error.details.message, 400);
        }

        const { email, password } = req.body;

        if (!email || !password) {
            throw generateError('Debes enviar un mail y una password', 400);
        }


        //recojo los datos de la base de datos del usuario con ese mail
        const user = await getUserByEmail(email);
        //compruebo que las contraseñas coinciden
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw generateError('La contraseña no coincide', 401);
        }
        //creo el payload del token
        const payload = { id: user.id };
        //firmo el token
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '5min',
        });
        //envio el token
        //el token es publico, garantiza que las contraseñas son las correctas
        res.send({
            status: 'ok',
            data: token,
        })
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginController,
}