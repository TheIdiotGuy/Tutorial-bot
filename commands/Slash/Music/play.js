const { MessageEmbed, MessageButton } = require('discord.js');
const { right, wrong, alert } = require(`../../../emojis.json`);
require(`colors`);
const distube = require("../../../utils/Distube/DistubeClient");
const { getData, getPreview, getTracks } = require("spotify-url-info");

module.exports = {

    name: 'play',
    description: 'Play Music in Voice Channel',
    timeout: 5000,
	category: 'Music',
    options: [
        {
            name: 'query',
            description: 'query to play',
            type: 3,
        },
    ],

    run: async (client, interaction) => {

        const query = interaction.options.getString('query') || '';
        const { channel } = interaction.member.voice;

        if (!channel) {
            return interaction.reply(`${wrong} Offo, Join a Voice Channel first To Play a Song!`)
        }

        if (
            interaction.guild.me.voice.channel &&
            channel.id != interaction.guild.me.voice.channel.id
        )

            return interaction.reply(`${alert} Join Voice Channel Same as Me! \`${interaction.guild.me.voice.channel.name}\``)


        if (
            query.includes("track") &&
            query.includes("open.spotify")
        ) {

            let info = await getPreview(query);
            return distube.play(interaction, info.artist + " " + info.title);


        }

        distube.play(channel, query, {

            interaction,
            textChannel: interaction.channel,
            member: interaction.member,

        })

        interaction.reply({

            embeds: [
                new MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription(`<a:ochako_load2:956933993113215046> **Searching : \`${query}\`**`)
            ],
            ephemeral: true

        })



    }
}