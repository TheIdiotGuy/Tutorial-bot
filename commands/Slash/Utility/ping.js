const { Client, Interaction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "ping",
    description: "The bot speed",
    category: "Utility",
    /**
     * 
     * @param {Client} client
     * @param {Interaction} interaction
     */
    async run(client, interaction) {

        var date = Date.now()

        const ping = new MessageEmbed()
            .setTitle("Ochako | BOT PING")
            .setColor('BLURPLE')
            .setTimestamp()
            .setDescription(`> **Ping : \`${Math.round(Date.now() - date)} ms!\`**`)
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

        interaction.reply({ embeds: [ping], ephemeral: true })
    }
}