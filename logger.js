const { createLogger, format, transports, config } = require('winston');
const pino = require('pino');



const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename: './logs/api-monitoring.log' })
    ]
});
// module.exports = logger;
module.exports = pino({});