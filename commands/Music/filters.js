const { MessageEmbed } = require('discord.js');
const { right, wrong, alert } = require(`../../emojis.json`);
require(`colors`);
const distube = require("../../utils/Distube/DistubeClient");

module.exports = {

  name: 'filter',
  description: 'Spice up the Music!',
  timeout: 5000,
  category: 'Music',
  options: [
    {
      name: 'name',
      description: 'Filter Name: (type "list" to see Filter panel)',
      type: 3,
    },
  ],

  run: async (client, interaction) => {

    const filterN = interaction.options.getString('name') || '';

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

    let queue = distube.getQueue(interaction)

    // if (!queue) {
    //   await interaction.reply("Queue is Empty!")
    // }

    let choice = null;

    switch (filterN) {

      case "bassboost":

        choice = "bassboost";
        break;

      case "3d":

        choice = "3d";
        break;

      case "echo":

        choice = "echo";
        break;

      case "karaoke":

        choice = "karaoke";
        break;

      case "nightcore":

        choice = "nightcore";
        break;

      case "vaporwave":

        choice = "vaporwave";
        break;

      case "flanger":

        choice = "flanger";
        break;

      case "gate":

        choice = "gate";
        break;

      case "haas":

        choice = "haas";
        break;

      case "reverse":

        choice = "reverse";
        break;

      case "surround":

        choice = "surround";
        break;

      case "mcompand":

        choice = "mcompand";
        break;

      case "phaser":

        choice = "phaser";
        break;

      case "tremolo":

        choice = "tremolo";
        break;

      case "earwax":

        choice = "earwax";
        break;

      case "clear":

        choice = false;
        break;

      default:

        choice = 404;
        await interaction.reply({
          embeds: [
            new MessageEmbed()
              .setColor("YELLOW")
              .setTitle(`${client.user.username} | Filter Panel`)
              .setDescription([
                `> **Collection of Filters Just To Spice Up your Music!**`,
                `\`\`\`fix`,
                "[ ! ] - 3d",
                "[ ! ] - bassboost",
                "[ ! ] - echo",
                "[ ! ] - karaoke",
                "[ ! ] - nightcore",
                "[ ! ] - vaporwave",
                "[ ! ] - flanger",
                "[ ! ] - gate",
                "[ ! ] - haas",
                "[ ! ] - reverse",
                "[ ! ] - surround",
                "[ ! ] - mcompand",
                "[ ! ] - phaser",
                "[ ! ] - tremolo",
                "[ ! ] - earwax",
                "[ ! ] - clear",
                `\`\`\``,
                `> ${alert} **To Use : \`/filter name: [your_filter]\`**`
              ].join("\n"))
              .setFooter({ text: "<3 Ochako", iconURL: client.user.displayAvatarURL({ dyamic: true }) })
          ]
        })
        break;

    }

    if (choice === 404) return;

    try {
      interaction.reply(`${alert} **Applying Filter :**` + filterN);
      distube.setFilter(interaction, choice)
    } catch (error) {
      interaction.reply(`${wrong} Offo, It looks like there's an err`)
      console.error(error);
    }

  }
}