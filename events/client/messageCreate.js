const { Message, Client } = require("discord.js")
let prefix = "!"

/**
 * @param {Message} message 
 * @param {Client} client 
 */

module.exports = (client, message) => {

    // if author is bot dont rply!
    if (message.author.bot) return;
    
    if (message.content === `${prefix}ping`) {
        message.channel.send(`My Ping : ${client.ws.ping} ms!`)
    }
}