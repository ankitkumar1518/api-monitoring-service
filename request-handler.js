const request = require('request-promise')
const logger = require('./logger')
const validateSchema = require('./schema-validator')
const _ = require('lodash')

function prepareRequestOptions(env, config, authRequired, authData) {
    const options = {};
    options.url = config.end_points[env];
    options.method = config.type;
    if (authRequired === true) {
        options.headers = JSON.parse(JSON.stringify(config.header));
        options.headers[authData[env]["target_key_name"]] += authData[env]["response_token_key"];
    } else {
        options.headers = config.header;
    }
    options.body = JSON.stringify(config.input[env]);
    return options;
}

async function makeRequest(config, authRequired, authData) {
    const environments = Object.keys(config["end_points"]);
    const result = [];
    for (env of environments) {
        const stats = {}
        const start = new Date();
        const options = prepareRequestOptions(env, config, authRequired, authData);
        stats["Product Name"] = config.product_name;
        stats["Microservice name"] = config.service_name;
        stats["env:endpoint"] = `${env}: ${options.url}`;
        stats["Description"] = config.description;
        try {
            const response = await request(options);
            let isValid;
            if (config.isStatic === true) {
                isValid = _.isEqual(JSON.parse(response), config.expected_output)
            } else {
                isValid = validateSchema(JSON.parse(response), config.expected_output)
            }
            if (isValid === true) {
                stats["Status"] = "Pass"
                stats["Latency"] = `${(new Date - start)/1000}s`
            } else {
                const error = new Error('The response does not match the expected output');
                error.message = "The response does not match the expected output"
                throw error
            }
        } catch (error) {
            stats["Status"] = "Fail"
            stats["Latency"] = `${(new Date - start)/1000}s`
            if (error.message) {
                stats["Error"] = error.message;
            } else {
                stats["Error"] = JSON.parse(JSON.stringify(error));
            }
        }
        stats["Time of execution"] = new Date();
        if (!stats.Error) {
            logger.info("The endpoint is up and running!", {data: stats});
        } else {
            logger.error("Error encountered while hitting the endpoint", {data: stats});
        }
        result.push(stats);
    }
    return result;
}

module.exports = makeRequest;
