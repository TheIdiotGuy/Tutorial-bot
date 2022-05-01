const { MessageEmbed, MessageButton } = require('discord.js');
const { right, wrong, alert } = require(`../../../emojis.json`);
require(`colors`);
const distube = require("../../../utils/Distube/DistubeClient");
    
module.exports = {
    
    name: 'skip',
    description: 'Skip the current song',
    timeout: 5000,
    category: 'Music',
    
    run: async (client, interaction) => {
    
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
    
      distube.skip(interaction);

      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor(color.color)
            .setDescription(`${right} **Current Song Skipped! By : <@${interaction.user.id}>**`)
        ]
      })
    }
}

// const { channel } = message.member.voice;

// if (!channel)
//   return message.channel.send(`${emo.alert} Offo, You're not connected to a voice channel. `)



// if (!message.guild.me.voice.channel)
//   return message.channel.send(`${emo.no} Nothing is Playing in Voice Channel! Type **\`${config.prefix}play [query]\`** to play a song!`)



//   if (
//     message.guild.me.voice.channel &&
//     channel.id != message.guild.me.voice.channel.id
//   )
//     return message.channel.send(`${emo.alert} Join the Voice Channel same as Me! ${message.guild.me.voice.channel.name}`)
  



// message.channel.send(
//   new MessageEmbed()
//            .setColor(color.color)
//            .setDescription(
//    `${emo.yes} **Current Song Skipped! By : <@${message.author.id}>**`
//  )
// )