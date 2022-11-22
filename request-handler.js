const request = require('request');
const validateSchema = require('./schema-validator')

function prepareRequestOptions(env, config) {
    const options = {};
    options.url = config.end_point[0][env];
    options.method = config.type;
    options.headers = config.header[0][env];
    options.body = JSON.stringify(config.input[0][env]);
    return options;
}

async function makeRequest(config, schema) {
    const environments = Object.keys(config["end_point"][0]);
    const result = {}
    console.log(environments);
    for (env of environments) {
        console.log("Making request for environment...", env)
        const options = prepareRequestOptions(env, config);
        await request(options, function (error, response) {
            if (error) {
                console.log(`Error in making request for env: ${env} => ${error}`)
            } else {
                result[env] = response
                console.log(response.body);
            }
        });
    }
    return result;
}

module.exports = makeRequest;
