const { MessageEmbed } = require('discord.js');
const { right, wrong, alert } = require(`../../../emojis.json`);
require(`colors`);
const distube = require("../../../utils/Distube/DistubeClient");
    
module.exports = {
    
    name: 'join',
    description: 'Joins the Voice Channel',
    timeout: 5000,
    category: 'Music',
    
    run: async (client, interaction) => {

      const { channel } = interaction.member.voice;

      if (!channel) {
        return interaction.reply(`${wrong} Offo, Join a Voice Channel first To Play a Song!`)
      }
  
      if (interaction.guild.me.voice.channel) {
  
        interaction.reply(`${wrong} Already Connected to a Voice Channel!`)
      }
  
      if (
        interaction.guild.me.voice.channel &&
        channel.id != interaction.guild.me.voice.channel.id
      ) {
        return interaction.reply(`${alert} Join Voice Channel Same as Me! \`${interaction.guild.me.voice.channel.name}\``)
      }

      await interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor("YELLOW")
            .setDescription(`${right} Joined : ${channel} Channel, Play a Song With \`/play query: [song name]\``)
        ]
      })

      distube.voices.join(channel)
    
    }
}