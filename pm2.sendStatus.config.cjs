module.exports = {
  apps: [{
    name: "sendStatus",
    script: "sendStatus.js",
    watch: "./db.json",
    ignore_watch: ["lighton.json", "botstats.json", "botstats.json.tmp", "countHours.json", "*.tmp"],
    exec_mode: "cluster_mode",
    instances: 1,
  }]
}