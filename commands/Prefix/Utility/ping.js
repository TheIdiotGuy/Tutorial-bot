const { Client, MessageEmbed, Message } = require("discord.js")

module.exports = {
    name: "ping",
    aliases: [],
    description: "The bot speed",
    category: "Utility",
    /**
     * 
     * @param {Client} client
     * @param {Message} message
     */
    async run(client, message, args) {

        message.reply("works")

    }
}