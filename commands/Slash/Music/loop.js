const { MessageEmbed } = require('discord.js');
const { right, wrong, alert } = require(`../../../emojis.json`);
require(`colors`);
const distube = require("../../../utils/Distube/DistubeClient");

module.exports = {
    
    name: 'loop',
    description: 'Loop the Song/Queue',
    timeout: 5000,
    category: 'Music',
    options: [
      {
        name: 'choice',
        description: 'Loop Options : ( disabled, song, queue )',
        type: 3,
      },
    ],
    
    run: async (client, interaction) => {
    
      const filterN = interaction.options.getString('choice') || '';
      const { channel } = interaction.member.voice;
      let queue = distube.getQueue(interaction);
      if (!queue) return interaction.reply(`${alert} There's Nothing Playing in Voice Channel!`)

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

      let repMode = null;

      switch (filterN) {

        case "disabled":
          
          repMode = 0;
          break;

        case "song": 
          
          repMode = 1;
          break;

        case "queue":

          repMode = 2;
          break;

        default:

          repMode = 404;
          interaction.reply({
            embeds: [
              new MessageEmbed()
                .setColor("YELLOW")
                .setTitle(`${client.user.username} | Loop Panel`)
                .setDescription([
                  `> **Types of Loops**`,
                  `\`\`\`fix`,
                  `[ ! ] - SONGS`,
                  `[ ! ] - QUEUE`,
                  `[ ! ] - DISABLED`,
                  '\`\`\`',
                  `> ${alert} **To Use : \`/loop name: [loop_type]\`**`
                ].join("\n"))
            ]
          })
      }

      if (repMode === 404) return;

      try {
        repMode = queue.setRepeatMode(repMode);
        repMode = repMode ? (repMode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off';
        interaction.reply(`${alert} **Loop Mode : ${repMode}**`);
      } catch (error) {
        interaction.reply(`${wrong} Offo, It looks like there's an err`);
        console.error(error);
      }
      
    }
}
  
  //     if (!args[0])
  //       return message.channel
  //         .send(
  //            new MessageEmbed()
  //                 .setColor(color.color)
  //                 .setDescription(`
  // ${emo.case} **Tell me the Loop Style You want in your listening!**
  // > ${emo.utils} Sets :
  // \`\`\`
  // 0
  // 1
  // 2
  // off
  // song
  // queue\`\`\``
  //           )
  //         )
  
  //     //set variable
  //     let loopis = args[0];
  //     if (args[0].toString().toLowerCase() === "song") loopis = "1";
  //     else if (args[0].toString().toLowerCase() === "queue") loopis = "2";
  //     else if (args[0].toString().toLowerCase() === "off") loopis = "0";
  //     else if (args[0].toString().toLowerCase() === "s") loopis = "1";
  //     else if (args[0].toString().toLowerCase() === "q") loopis = "2";
  //     else if (args[0].toString().toLowerCase() === "disable") loopis = "0";
  //     loopis = Number(loopis);
  
  //     if (0 <= loopis && loopis <= 2) {
  //       await distube.setRepeatMode(message, parseInt(args[0]));
  //       message.channel
  //         .send(
  //            new MessageEmbed()
  //                 .setColor(color.color)
  //                 .setDescription(`
  //             ${emo.utils} **Loop Mode Set to:**`,
  //             `${args[0]
  //               .replace("0", "OFF")
  //               .replace("1", "Repeat song")
  //               .replace("2", "Repeat Queue")}`
  //           )
  //         )
  
  //     } else {
  //       message.channel
  //         .send(
  //            new MessageEmbed()
  //                 .setColor(color.color)
  //                 .setDescription(
  //             `${emo.alert} **Please use a number between **\`0\`** and **\`2\`**   |   *\`(0: disabled, 1: Repeat a song, 2: Repeat all the queue)\`* :P**`
  //           )
  //         )
    
  //     }
  //     message.channel
  //       .send(
  //          new MessageEmbed()
  //                 .setColor(color.color)
  //                 .setDescription(
  //           `${emo.yes} **Song is Looped By : <@${message.author.id}>**`
  //         )
  //       )