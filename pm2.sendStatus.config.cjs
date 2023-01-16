const pm2Config = {
    apps: [
      {
        name: 'sendStatus',
        script: 'sendStatus.js',
        watch: ["db.json"],
        exec_mode: 'cluster_mode',
        instances: 1,
      },
    ],
  }

  module.exports = pm2Config