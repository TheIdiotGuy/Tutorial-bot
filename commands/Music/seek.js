const { MessageEmbed, MessageButton } = require('discord.js');
const { right, wrong, alert } = require(`../../emojis.json`);
require(`colors`);
const distube = require("../../utils/Distube/DistubeClient");

module.exports = {

  name: 'seek',
  description: 'Seek the song!',
  timeout: 5000,
  category: 'Music',
  options: [
    {
      name: 'minutes',
      description: 'Must be integer : b/w 0-59',
      type: 4,
    },
    {
      name: 'seconds',
      description: 'Must be integer : b/w 0-59',
      type: 4,
    },
  ],

  run: async (client, interaction) => {

    const seekMin = interaction.options.getInteger('minutes') || 0;
    const seekSec = interaction.options.getInteger('seconds') || 0;

    const seekMinute = +seekMin * 60;
    const seekSecond = +seekSec;
    const seekTime = seekMinute + seekSecond;

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

    let queue = distube.getQueue(interaction);
    if (!queue) return interaction.reply(`${alert} There's Nothing Playing in Voice Channel!`)

    if (
      seekSecond > 59 ||
      seekTime < 0 ||
      isNaN(seekSecond) ||
      isNaN(seekMinute)
    ) {
      interaction.reply("Invalid time range. It must be in range of 0-59");
      return;
    } else if (seekTime > queue.songs[0].duration) {
      await interaction.reply("The seek time can't be longer than the song duration!");
      return;
    }
    distube.seek(interaction, seekTime)

    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor("YELLOW")
          .setDescription(`${right} Song Forwarded to \`${seekMin} : ${seekSec}\` \n By <@${interaction.member.id}>`)
      ]
    })

  }
}