const validate = require('jsonschema').validate;

function validateSchema(inputJSON, schema) {
    const result = validate(inputJSON, schema);
    if (result.errors.length === 0) {
        return true;
    } else {
        return result.errors;
    }
}

module.exports = validateSchema;