'use-strinct'
const { Dynamo } = require('../../../../comun/Dynamo');
const { Responses } = require('../../../../comun/API_Responses');
const bcrypt = require('bcryptjs');

// CREAR USUARIO
module.exports.createUser = async (params, tableName) => {

    try {

        params.password = bcrypt.hashSync(params.password, 10);
        params.email = params.email.toUpperCase().trim();
        params.name = params.name.toUpperCase().trim();
        params.last_name = params.last_name.toUpperCase().trim();
        params.second_last_name = params.second_last_name.toUpperCase().trim();
        params.dni = params.dni.toUpperCase().trim();
        params.state = 1;
        params.createdAt = new Date().getTime();

        const data = await Dynamo.write(params, tableName);

        // VERIFICA QUE HAYAN RESULTADOS.
        if (!data) {
            return Responses._400({ error: `No se pudo escribir el usuario con email ${user.email}.` });
        }

        // QUITAR PASSWORD PARA EL ENVÍO DE LA RESPUESTA.
        delete data.Attributes.password;

        // RETORNA RESPUESTA.
        return data;

    } catch (error) {

        return error

    }

};