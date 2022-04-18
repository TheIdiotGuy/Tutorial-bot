const { Client, Intents } = require("discord.js");

const client = new Client({
    intents: 515,
    allowedMentions: {
        parse: ["users", "roles"],
        repliedUser: true
    },
    shards: "auto",
    presence: {
        status: "idle",
        // activities: [
        //     {
        //         name: "Developing!!",
        //         type: "PLAYING"
        //     }
        // ]
    }
})

module.exports = client;