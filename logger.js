const { createLogger, format, transports, config } = require('winston');

const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename: './logs/api-monitoring.log' })
    ]
});
module.exports = logger;