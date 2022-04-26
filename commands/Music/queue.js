const { MessageEmbed, MessageButton } = require('discord.js');
const { right, wrong, alert } = require(`../../emojis.json`);
require(`colors`);
const distube = require("../../utils/Distube/DistubeClient");

module.exports = {

  name: 'queue',
  description: 'Music Queue',
  timeout: 5000,
  category: 'Music',

  run: async (client, interaction) => {

    const { channel } = interaction.member.voice;

    if (!channel) {
      return interaction.reply(`${wrong} Offo, Join a Voice Channel first To Play a Song!`)
    }

    // if (interaction.guild.me.voice.channel) {

    //   interaction.reply(`${wrong} Already Connected to a Voice Channel!`)
    // }

    if (
      interaction.guild.me.voice.channel &&
      channel.id != interaction.guild.me.voice.channel.id
    ) {
      return interaction.reply(`${alert} Join Voice Channel Same as Me! \`${interaction.guild.me.voice.channel.name}\``)
    }

    let queue = distube.getQueue(interaction);

    await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor("YELLOW")
          .setDescription(`> **Current Queue:**\n` + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)
            .slice(0, 10)
            .join("\n"))
      ]
    })
  }
}


  // //get the queue

  // message.channel
  //   .send(
  //      new MessageEmbed()
  //             .setColor(color.color)
  //             .setDescription(
  //       `> ${emo.case} **Current Queue:**\n` + queue.songs
  //           .map(
  //             (song, id) =>
  //               `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
  //           )
  //           .slice(0, 10)
  //           .join("\n")
  //     )
  //   )