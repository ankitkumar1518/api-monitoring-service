const validate = require('jsonschema').validate;

function validateSchema(inputJSON, shema) {
    // console.log(validate(inputJSON, shema))
    return true;
}

module.exports = validateSchema;