const { Client, Intents } = require("discord.js");

const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_VOICE_STATES",
        "DIRECT_MESSAGES",
        "GUILD_PRESENCES",
    ],
    allowedMentions: {
        parse: ["users", "roles"],
        repliedUser: true
    },
    shards: "auto",
    // presence: {
    //     status: "idle",
    // },
    ws: {
        properties: {
            $browser: "Discord iOS"
        }
    }
})

module.exports = client;