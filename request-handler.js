const request = require('request');
const validateSchema = require('./schema-validator')

function prepareRequestOptions(env, config) {
    const options = {};
    options.url = config.end_points[env];
    options.method = config.type;
    options.headers = config.header;
    options.body = JSON.stringify(config.input[env]);
    return options;
}

function doRequest(options) {
    return new Promise(function (resolve, reject) {
        request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            resolve(response);
        } else {
            reject(error);
        }
        });
    });
}

async function makeRequest(config, schema) {
    const environments = Object.keys(config["end_points"]);
    const result = {}
    for (env of environments) {
        const options = prepareRequestOptions(env, config);
        
        console.log("\n\n\n\n")
        console.log("Microservice name: ", config.service_name);
        console.log(`env: ${env}, endpoint: ${options.url}`);
        console.log("Description: ", config.description);
        console.time("Latency");
        try {
            let response = await doRequest(options);
            console.log("Request status: Pass")
            console.timeEnd("Latency")
            console.log("Time of execution: ", new Date())
        } catch (error) {
            console.log("Request status: Fail")
            console.timeEnd("Latency")
            console.log("Time of execution: ", new Date())
            console.error(error);
        }
    }
    return result;
}

module.exports = makeRequest;
