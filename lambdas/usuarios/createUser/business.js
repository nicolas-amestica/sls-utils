'use-strinct'
const User = require('./DAO/user_management');
const { Responses } = require('../../../comun/API_Responses');

// CREAR USUARIO
module.exports.createUser = async (event) => {

    try {

        const { email, password, name, last_name, second_last_name, dni, business, country } = JSON.parse(event.body);

        // VERIFICA QUE SE HAYAN RECIBIDO LOS PARAMETROS NECESARIOS PARA EL PROCESO
        if (!email || !password || !name || !last_name || !second_last_name || !dni)
            return Responses._400({ error: 'Faltan parámetros de entrada.', email, password, name, last_name, second_last_name, dni, business, country });

        const arrBusiness = [0, 1];

        if (typeof business != 'number' || !arrBusiness.includes(business))
            return Responses._400({ error: 'Business debe ser un valor numérico entre 0 y 1.', data: business });

        const arrCountry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        if (typeof country != 'number' || !arrCountry.includes(country))
            return Responses._400({ error: `Country debe ser un valor numérico entre 1 y ${arrCountry.length}.` });

        let { ...user } = JSON.parse(event.body);

        const result = await User.createUser(user, process.env.TABLE_USUARIO_DYNAMODB);

        // VERIFICA QUE HAYAN RESULTADOS
        if (!result) {
            return Responses._402({ error: `No se pudo escribir el usuario con email ${user.email}.` });
        }

        // RETORNA RESPUESTA.
        return Responses._200({
            message: `Usuario con email ${user.email} creado correctamente.`,
            data: result
        });

    } catch (error) {

        return error

    }

};