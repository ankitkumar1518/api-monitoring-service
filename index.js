const validateSchema = require('./schema-validator')
const endpointConfig = require('./config/GenericTestRunner_Endpoint_Payload_format.json')
const schema = require('./config/schema.json')
const makeRequest = require('./request-handler')

if (validateSchema(endpointConfig, schema) === false) {
    console.log("The given endpoint shema is configured incorrectly!!!")
} {
    console.log("The endpoint shema is valid.")
    endpointConfig.forEach(serviceConfig => {
        const response = makeRequest(serviceConfig);
        if (response.error) {
            console.log("The service is not running as expected")
        } else {
            console.log("The response code is ...")
            console.log(response)
        }
    });
}
