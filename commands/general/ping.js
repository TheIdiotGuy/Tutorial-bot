const { Client } = require("discord.js")

module.exports = {
    name: "ping",
    description: "The bot speed",
    category: "general",
    /**
     * 
     * @param {Client} client
     */
    run: async (client, interaction) => {
        interaction.reply({ content: `Client Ping : ${client.ws.ping}`, ephemeral: true })
    }
}