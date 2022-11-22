const request = require('request');

function prepareRequestOptions(env, config) {
    const options = {};
    options.url = config.end_point[0][env];
    options.method = config.type;
    options.headers = config.header[0][env];
    options.body = JSON.stringify(config.input[0][env]);
    return options;
}

function makeRequest(config, schema) {
    const environments = Object.keys(config["end_point"][0]);
    const result = {}
    for (env of environments) {
        const options = prepareRequestOptions(env, config);
        request(options, function (error, response) {
            if (error) {
                throw new Error(error);
            } 
            console.log("Making request for environment...", env)
            result[env] = response
            console.log(response.body);
        });
    }
    return result;
}


module.exports = makeRequest;
