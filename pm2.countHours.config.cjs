const pm2ConfigCountHours = {
    apps: [
      {
        name: 'countHours',
        script: 'countHours.js',
        watch: ["db.json"],
        exec_mode: 'cluster_mode',
        instances: 1,
      },
    ],
  }

  module.exports = pm2ConfigCountHours;