const AWS = require('aws-sdk');
const { Responses } = require('./API_Responses');

const options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
    async get(email, TableName) {

        const params = {
            TableName,
            Key: {
                email,
            },
        };

        const data = await documentClient.get(params).promise();

        // if (!data || !data.Item) {
        //     throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
        // }

        return data.Item;

    },
    async write(data, TableName) {

        if (!data.email) {
            throw 'No hay EMAIL en la data';
        }

        const params = {
            TableName,
            Item: data,
            ReturnValues: 'NONE',
            ReturnConsumedCapacity: 'TOTAL',
            ReturnItemCollectionMetrics: 'SIZE'
        };

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw `Ocurrió un error insertando el ID ${data.EMAIL} en tabla ${TableName}`;
        }

        return res;
    },
    update: async ({ tableName, primaryKey, primaryKeyValue, updateKey, updateValue }) => {

        const params = {
            TableName: tableName,
            Key: { [primaryKey]: primaryKeyValue },
            UpdateExpression: `set ${updateKey} = :updateValue`,
            ConditionExpression: 'attribute_exists(ID)',
            ExpressionAttributeValues: {
                ':updateValue': updateValue,
            },
            ReturnValues: "ALL_NEW"
        };

        return documentClient.update(params).promise();
    },
    query: async ({ tableName, index, queryKey, queryValue }) => {

        const params = {
            TableName: tableName,
            IndexName: index,
            KeyConditionExpression: `${queryKey} = :hkey`,
            ExpressionAttributeValues: {
                ':hkey': queryValue,
            },
        };

        const res = await documentClient.query(params).promise();

        return res.Item || [];
    },
    scan: async ({ tableName, projectionExpression, filterExpression, expressionAttributes }) => {

        const params = {
            TableName: tableName,
            ProjectionExpression: projectionExpression,
            FilterExpression: filterExpression,
            ExpressionAttributeValues: expressionAttributes,
        };

        const res = await documentClient.scan(params).promise();

        return res || [];
    },

};

module.exports = {
    Dynamo
};