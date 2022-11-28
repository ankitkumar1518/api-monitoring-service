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
    "customLevels": levels,
    "useOnlyCustomLevels": true,
    "messageKey": "message",
    // "timestamp": false,
    "translateTime": "SYS:mm-dd-yyyy hh:mm:ss TT",
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

const streams = [
    { stream: process.stdout },
    { stream: pino.destination('./logs/api-monitoring.log') },
  ];

const stream = pino.destination({
    dest: './logs/api-monitoring.log',
    minLength: 1024,
    sync: false,
})



// module.exports = pino(options, pino.multistream(streams));
module.exports = pino(options, stream);