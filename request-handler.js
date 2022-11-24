const request = require('request');
const logger = require('./logger')
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
    const result = [];
    for (env of environments) {
        const stats = {}
        let start = new Date();
        const options = prepareRequestOptions(env, config);
        stats["Product Name"] = config.product_name;
        stats["Microservice name"] = config.service_name;
        stats["env:endpoint"] = `${env}: ${options.url}`;
        stats["Description"] = config.description;
        console.log("\n\n\n\n")
        try {
            let response = await doRequest(options);
            stats["Status"] = "Pass"
            stats["Latency"] = `${(new Date - start)/1000}s`
        } catch (error) {
            stats["Status"] = "Fail"
            stats["Latency"] = `${(new Date - start)/1000}s`
            stats["Error"] = JSON.parse(JSON.stringify(error));
        }
        stats["Time of execution"] = new Date();
        if (!stats.Error) {
            logger.info(stats, {created_at: new Date()});
        } else {
            logger.error(stats, {created_at: new Date()});
        }
        result.push(stats);
    }
    return result;
}

module.exports = makeRequest;
