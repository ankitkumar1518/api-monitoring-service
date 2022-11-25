const rp = require('request-promise')
const logger = require('./logger')
const validateSchema = require('./schema-validator')

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
        let start = new Date();
        const options = prepareRequestOptions(env, config, authRequired, authData);
        console.log("options: ", options)
        stats["Product Name"] = config.product_name;
        stats["Microservice name"] = config.service_name;
        stats["env:endpoint"] = `${env}: ${options.url}`;
        stats["Description"] = config.description;
        console.log("\n\n\n\n")
        try {
            let response = await rp(options);
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
