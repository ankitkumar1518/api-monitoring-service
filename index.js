const validateSchema = require('./schema-validator')
const endpointConfig = require('./config/GenericTestRunner_Endpoint_Payload_format.json')
const schema = require('./config/schema.json')
const makeRequest = require('./request-handler')


const result = validateSchema(endpointConfig, schema);
async function run() {
    if (!result.errors) {
        console.log("The given endpoint shema is configured incorrectly!!!")
    } else {
        console.log("The endpoint shema is valid.")
        for (serviceConfig of endpointConfig) {
            for (test_cases of serviceConfig.test_cases) {
                const response = await makeRequest(test_cases);
                if (response.error) {
                    console.log("The service is not running as expected")
                } else {
                    console.log("The response code is ...")
                    console.log(response)
                }
            }
        };
    }
}

run();
