# api-monitoring-service
Installation
1. npm install
2. pm2 start ecosystem.config.js   <OR>   npm start

Input config
1. reading from the path data/GenericTestRunner_Endpoint_Payload_format.json.
2. It contains the configurations of all the endpoints to monitor.
3. update this file if wish to monitor more services

Output report
1. stored at the location logs/api-monitoring.log
2. shows the statistics of the enpoints and errors if any.
