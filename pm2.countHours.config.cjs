const pm2ConfigCountHours = {
    apps: [
      {
        name: 'countHours',
        script: 'countHours.js',
        watch: ["db.json"],
        ignore_watch: ["lighton.json", "botstats.json", "botstats.json.tmp", "countHours.json", "*.tmp"],
        exec_mode: 'cluster_mode',
        instances: 1,
      },
    ],
  }

  module.exports = pm2ConfigCountHours;