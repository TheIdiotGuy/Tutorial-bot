const { Message, Client } = require("discord.js")
let prefix = "!"

/**
 * @param {Message} message 
 * @param {Client} client 
 */

module.exports = {
    name: "messageCreate",
    run: async (client, message) => {

        // if author is bot dont rply!
        if (message.author.bot) return;
        if (message.mentions.users.has(client.user.id)) {
            message.reply(`My prefix is **${prefix}**`)
        }
        if (message.content === `${prefix}ping`) {
            message.channel.send(`My Ping : ${client.ws.ping} ms!`)
        }
    }
}