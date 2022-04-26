const { MessageEmbed, MessageButton } = require('discord.js');
const { right, wrong, alert } = require(`../../emojis.json`);
require(`colors`);
const distube = require("../../utils/Distube/DistubeClient");

module.exports = {

  name: 'volume',
  description: 'Adjust the Sound',
  timeout: 5000,
  category: 'Music',
  options: [
    {
      name: "volume",
      description: "The value for the Volume.",
      type: 4,
      required: true
    }
  ],

  run: async (client, interaction) => {

    const volume = interaction.options.getInteger('volume') || 100;
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

    distube.setVolume(message, volume);

    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor("YELLOW")
          .setDescription(`> ${right} Song volume set to ${volume}% by <@${interaction.user.id}>`)
      ]
    })
  }
}