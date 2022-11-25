const { createLogger, format, transports, config } = require('winston');
const pino = require('pino');
const moment = require("moment");


const levels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    verbose: 4,
    debug: 5,
    silly: 6
}

const options = {
    mixin() {
        return {
            "application": "data-pipeline",
            "timestamp": moment().toISOString()
        }
    },
    "customLevels": levels,
    "useOnlyCustomLevels": true,
    "messageKey": "message",
    "timestamp": false,
    "level": "fatal",
    "formatters": {
        level(label, number) {
            return { "level": label }
        },
        log(object) {
            return object
        }
    }
}

const stream = pino.destination({
    dest: './logs/api-monitoring.log',
    minLength: 1024, //4096 Buffer before writing
    sync: false, // Asynchronous logging
})


const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename: './logs/api-monitoring.log' })
    ]
});
// module.exports = logger;
module.exports = pino(options, stream);