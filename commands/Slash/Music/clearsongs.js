const { MessageEmbed } = require('discord.js');
const { right, wrong, alert } = require(`../../../emojis.json`);
require(`colors`);
const distube = require("../../../utils/Distube/DistubeClient");

module.exports = {

  name: 'clearsong',
  description: 'Remove the song!',
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

    let queue = distube.getQueue(interaction);

    queue.songs = [queue.songs[0]];

    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor("YELLOW")
          .setAuthor({ name: `${right} Cleared All The Songs Requested by | ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      ]
    })

  }
}