const validateSchema = require('./schema-validator')
const endpointConfig = require('./data/GenericTestRunner_Endpoint_Payload_format.json')
const schema = require('./data/schema.json')
const makeRequest = require('./request-handler')
var cron = require('node-cron');


async function run() {
    const result = validateSchema(endpointConfig, schema);
    if (!result.errors) {
        console.log("The given endpoint shema is configured incorrectly!!!")
    } else {
        console.log("The endpoint shema is valid.")
        for (serviceConfig of endpointConfig) {
            for (test_cases of serviceConfig.test_cases) {
                const response = await makeRequest(test_cases);
            }
        };
    }
}

cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
    run();
});

