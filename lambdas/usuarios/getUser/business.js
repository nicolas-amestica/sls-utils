'use-strinct'
const User = require('./DAO/user_management');
const { Responses } = require('../../../comun/API_Responses');

// CREAR USUARIO
module.exports.getUser = async (event) => {

    try {

        const { email, business, country } = event.queryStringParameters;

        let { ...user } = event.queryStringParameters;

        const result = await User.get(user, process.env.TABLE_USUARIO_DYNAMODB);



        // VERIFICA QUE HAYAN RESULTADOS
        // if (!result) {
        //     return Responses._402({ error: `No se pudo escribir el usuario con email ${user.email}.` });
        // }

        // // RETORNA RESPUESTA.
        // return Responses._200({
        //     message: `Usuario con email ${user.email} creado correctamente.`,
        //     data: result
        // });

        return "hola"

    } catch (error) {

        return error

    }

};