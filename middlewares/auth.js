const authUser = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw generateError('Falta la cabecera de Authorization', 401);
        }
        //comprobamos que el token sea correcto
        let = token;

        try {
            token = jwt.verify(authorization, process.env.SECRET);
        } catch (error) {
            throw generateError('Token incorrecto', 401);
        }

        // metemos la informacion del token en la request para usarla en el controlador

        req.userId = token.id;
        //saltamos al controlador


        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    authUser,
};