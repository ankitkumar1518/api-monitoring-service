const request = require('request-promise')
const logger = require('./logger')
const validateSchema = require('./schema-validator')

function prepareRequestOptions(config) {
    const options = {};
    options.url = config.token_url;
    options.method = config.type;
    options.headers = config.header;
    options.body = JSON.stringify(config.input);
    return options;
}

async function getAuthData(config) {
    const environments = Object.keys(config);
    const result = {};
    for (env of environments) {
        const options = prepareRequestOptions(config[env]);
        result[env] = {};
        try {
            const response = await request(options);
            const responseBody = JSON.parse(response);
            const target_key_name = config[env]["target_key_name"];
            const response_token_key = responseBody[config[env]["response_token_key"]];
            result[env]["target_key_name"] = target_key_name;
            result[env]["response_token_key"] = response_token_key;
        } catch (error) {
            result[env].error = JSON.parse(JSON.stringify(error));
        }
    }
    return result;
}

module.exports = getAuthData;
