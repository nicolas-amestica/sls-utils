'use-strinct'
const { Dynamo } = require('../../comun/Dynamo');
const { Responses } = require('../../comun/API_Responses');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

module.exports.login = async (event) => {

    try {

        const { email, password } = JSON.parse(event.body);

        // VERIFICA QUE SE HAYAN RECIBIDO LOS PARAMETROS NECESARIOS PARA EL PROCESO
        if (!email || !password)
            return Responses._400({ error: 'Usuario o contraseña incorrectos.' });

        const { state, ...user } = await Dynamo.get(email.toUpperCase().trim(), process.env.TABLE_USUARIO);

        // VERIFICA QUE HAYAN RESULTADOS
        if (!user) 
            return Responses._400({ error: 'Usuario o contraseña incorrectos.' });

        // VERIFICA QUE EL USUARIO ESTÉ EN ESTADO 1
        if (state != 1) 
            return Responses._400({ error: 'Usuario no activo.' });

        // VEIRIFCA CLAVE
        if (!bcrypt.compareSync(password, user.password)) 
            return Responses._400({ error: 'Usuario o contraseña incorrectos.' });

        // GENERA TOKEN.
        const token = JWT.sign({
            usuario: user
            }, process.env.SEED_TOKEN, {
            expiresIn: parseInt(process.env.EXPIRE_TOKEN)
        });

        user.token = token;
        delete user.password;
        delete user.createdAt;

        // RETORNA RESPUESTA.
        return Responses._200(
            user
        );

    } catch (error) {

        return error;

    }

};