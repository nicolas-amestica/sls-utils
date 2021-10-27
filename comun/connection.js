
let configFinanzas = {
    server: process.env.DB_HOST_FINANCES,
    database: process.env.DB_NAME_FINANCES,
    user: process.env.DB_USUARIO_FINANCES,
    password: process.env.DB_PASS_FINANCES,
    multipleStatements: true,
    requestTimeout: 300000,
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

module.exports.validarConexionFinanzas = async () => {

    let message = [];

    if (!configFinanzas.server)
        message.push("No está configurado el host del servidor de base de datos");

    if (!configFinanzas.database)
        message.push("No está configurado el nombre del servidor de base de datos");

    if (!configFinanzas.user)
        message.push("No está configurado el usuario del servidor de base de datos");

    if (!configFinanzas.password)
        message.push("No está configurada la clave del servidor de base de datos");

    return message;

}

exports.configFinanzas = configFinanzas;