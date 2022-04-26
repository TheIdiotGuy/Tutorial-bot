const { Client, Intents } = require("discord.js");

const client = new Client({
    intents: 643,
    allowedMentions: {
        parse: ["users", "roles"],
        repliedUser: true
    },
    shards: "auto",
    presence: {
        status: "idle",
    }
})

module.exports = client;