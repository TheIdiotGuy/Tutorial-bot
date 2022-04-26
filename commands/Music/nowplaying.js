const { MessageEmbed, MessageButton } = require('discord.js');
const { right, wrong, alert } = require(`../../emojis.json`);
require(`colors`);
const distube = require("../../utils/Distube/DistubeClient");

module.exports = {
    
    name: 'nowplaying',
    description: 'Show the song playing currently',
    timeout: 5000,
    category: 'Music',
    
    run: async (client, interaction ) => {
    
        const { channel } = interaction.member.voice;

        if (!channel) {
          return interaction.reply(`${wrong} Offo, Join a Voice Channel first To Play a Song!`)
        }
    
        if (
          interaction.guild.me.voice.channel &&
          channel.id != interaction.guild.me.voice.channel.id
        ) {
          return interaction.reply(`${alert} Join Voice Channel Same as Me! \`${interaction.guild.me.voice.channel.name}\``)
        }
        
        const queue = distube.getQueue(interaction);

        if (!queue) return interaction.reply(`${alert} There's Nothing Playing in Voice Channel!`)

        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription(`**Currently Playing!\n > 1 - ${queue.songs[0].name}`)
                    .setURL(queue.songs[0].url)
                    .setThumbnail(queue.songs[0].thumbnail)
            ]
        })
    }
}