'use strict';
const Business = require('./business');
const { Responses } = require('../../../comun/API_Responses');

module.exports.generico = async (event) => {
  
    try {

        const { email, country, business } = event.queryStringParameters;

        if (!business || !country || !email)
            return Responses._400({ error: `Faltan parámetros de entrada.` });

        if (!process.env.BUSINESS.includes(business))
            return Responses._400({ error: 'Business debe ser un valor numérico entre 0 y 1.', data: business });
        
        if ((parseInt(country) === 0) || !(process.env.COUNTRIES.includes(country)))
            return Responses._400({ error: `Country debe ser un valor numérico entre 1 y ${process.env.COUNTRIES.length}.`, data: country });

        const result = await Business.getUser(event);

        // /** VALIDAR RESPUESTA DEL PROCESO. */
        // if (result.body.error !== undefined)
        //     return context.res = result;

        // if (RESULT.statusCode < 200 || RESULT.statusCode >= 400) {
        //     throw RESULT;
        // }

        // return RESULT;
        return "hola"

    } catch (error) {

        return error;

    }

};