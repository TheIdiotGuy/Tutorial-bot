const { Client, Interaction, MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    name: "puttparty",
    description: "Play Together!",
    category: "Games",
    /**
     * 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async run(client, interaction) {

        const { channel } = interaction.member.voice;

        if (!channel) {
            return interaction.reply({ content: `Join a Voice Channel first To Play!`, ephemeral: true })
        }

        if (
            interaction.guild.me.voice.channel &&
            channel.id != interaction.guild.me.voice.channel.id
        )

            return interaction.reply({ content: `Join Voice Channel Same as Me!\n\`${interaction.guild.me.voice.channel.name}\``, ephemeral: true })

        client.games.createTogetherCode(channel.id, "puttparty").then(async (invite) => {
            return interaction.reply({
                embeds: [
                    {
                        title: "Ochako | Games",
                        description: [
                            `> **Click the button below to start playing.**`
                        ].join("\n"),
                        color: "#5440cd"
                    }
                ],
                components: [
                    new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel("Click to Play")
                                .setStyle("LINK")
                                .setURL(invite.code)
                        )
                ]
            })
        })
    }
}