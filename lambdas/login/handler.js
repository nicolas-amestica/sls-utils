'use strict';
const Business = require('./business');

module.exports.generico = async (event) => {
  
    try {

        const RESULT = await Business.login(event);

        if (RESULT.statusCode < 200 || RESULT.statusCode >= 400)
            throw RESULT;

        return RESULT;

    } catch (error) {

        console.log(error);
        return error;

    }

};