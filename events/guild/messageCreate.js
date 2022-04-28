const { Message, Client } = require("discord.js")
let prefix = "!"

/**
 * @param {Message} message 
 * @param {Client} client 
 */

module.exports = async (client, message) => {

    // if author is bot dont rply!
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.mentions.users.has(client.user.id)) {
        message.reply(`Ochako uses slash commands only for now. use \`/help\` for a list of commands`)
    }
}
