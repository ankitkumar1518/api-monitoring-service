module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [{
      name: 'api-monitoring-service',
      script: 'index.js',
      instances: '1',
      exec_mode: 'cluster',
      env: {},
      env_dev: {
        NODE_ENV: 'dev'
      },
      env_staging:
      {
        NODE_ENV: 'staging'
      },
      env_newdev: {
        NODE_ENV: 'newdev'
      },
      env_qa: {
        NODE_ENV: 'qa'
      },
      env_preprod: {
        NODE_ENV: 'preprod'
      },
      env_prod: {
        NODE_ENV: 'prod'
      }
    }]
  };
  