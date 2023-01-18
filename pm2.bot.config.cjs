module.exports = {
  apps: [{
    name: "lightonbot",
    script: "bot.js",
    watch: true,
    ignore_watch: ["botstats.json", "lighton.json", "countHours.json", "botstats.json.tmp", "*.tmp"],
  }]
}