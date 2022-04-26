const { MessageEmbed, MessageButton } = require('discord.js');
const { right, wrong, alert } = require(`../../emojis.json`);
require(`colors`);
const distube = require("../../utils/Distube/DistubeClient");

module.exports = {

    name: 'stop',
    description: 'Stops the music',
    timeout: 5000,
    category: 'Music',

    run: async (client, interaction) => {

        const { channel } = interaction.member.voice;

        if (!channel) {
            return interaction.reply(`${wrong} Offo, Join a Voice Channel first To Play a Song!`)
        }

        if (!interaction.guild.me.voice.channel) {
            return interaction.channel.send(`${emo.no} Nothing is Playing in Voice Channel! Type **\`${config.prefix}play [query]\`** to play a song!`)
        }



        if (
            interaction.guild.me.voice.channel &&
            channel.id != interaction.guild.me.voice.channel.id
        )
            return interaction.reply(`${alert} Join the Voice Channel same as Me! ${interaction.guild.me.voice.channel.name}`)



        distube.stop(interaction);

        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription(
                        `${right} **Current Song Stopped! By : <@${interaction.user.id}>**`
                    )
            ]

        })

    }
}