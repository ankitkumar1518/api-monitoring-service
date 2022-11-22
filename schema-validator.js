const validate = require('jsonschema').validate;

function validateSchema(inputJSON, schema) {
    return validate(inputJSON, schema)
}

module.exports = validateSchema;