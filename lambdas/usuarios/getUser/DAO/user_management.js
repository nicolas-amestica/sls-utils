'use-strinct'
const { Dynamo } = require('../../../../comun/Dynamo');
const { Responses } = require('../../../../comun/API_Responses');
const bcrypt = require('bcryptjs');

// CREAR USUARIO
module.exports.get = async (params, tableName) => {

    try {

        const email = params.email.toUpperCase().trim();

        console.log(email);

        // RETORNA RESPUESTA.
        return data;

    } catch (error) {

        return error

    }

};