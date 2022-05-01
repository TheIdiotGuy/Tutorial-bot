const { MessageEmbed } = require('discord.js');
const { right, wrong, alert } = require(`../../../emojis.json`);
require(`colors`);
const distube = require("../../../utils/Distube/DistubeClient");

module.exports = {

    name: 'autoplay',
    description: 'Play Music in Voice Channel',
    timeout: 5000,
    category: 'Music',

    run: async (client, interaction) => {

        const query = interaction.options.getString('query') || '';
        const { channel } = interaction.member.voice;

        if (!channel) {
            return interaction.reply(`${wrong} Offo, Join a Voice Channel first To Play a Song!`)
        }

        if (!interaction.guild.me.voice.channel) {

            interaction.reply(`${wrong} Not Connected to a Voice Channel!`)
        }

        if (
            interaction.guild.me.voice.channel &&
            channel.id != interaction.guild.me.voice.channel.id
        ) {
            return interaction.reply(`${alert} Join Voice Channel Same as Me! \`${interaction.guild.me.voice.channel.name}\``)
        }

        let queue = distube.getQueue(interaction);
        if (!queue) return interaction.reply(`${alert} There's Nothing Playing in Voice Channel!`)

        const currMode = distube.toggleAutoplay(interaction);

        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("YELLOW")
                    .setAuthor({ name: `Music Resumed By : <@${interaction.user.id}>`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(
                        `> AutoPlay is Now | **${currMode ? `${right} Active` : `${wrong} Idle`}**`
                    )
            ]
        })

    }
}