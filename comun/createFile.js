'use strict';
const fs = require('fs').promises;
const ObjectsToCsv = require('objects-to-csv-file');

module.exports.deleteFile = async (filePath) => {

    try {

        await fs.unlink(filePath);

        return true;

    } catch (error) {

        console.log(error);

        return { error };

    }

};

module.exports.exportData = async (data, fileName) => {

    try {

        const fullPathFile = `${process.env.TMP_FOLDER}${fileName}.csv`;

        const csv = new ObjectsToCsv(data);

        if (!csv)
            throw 'No se pudieron serializar los datos.';

        const result = await csv.toDisk(fullPathFile, { header: true, delimiter: ';' });

        if (!result)
            throw 'No se pudo generar el archivo CSV.';

        return { name: `${fileName}.csv`, path: fullPathFile, result };

    } catch (error) {

        return { error };

    }

};