const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Interaction } = require(`discord.js`);

module.exports = {

  name: `setup-music`,
  description: "Setup the music system",
  category: `Settings`,

  /**
     * 
     * @param {require("../../utils/client")} client
     * @param {Interaction} interaction
     */

  run: async (client, interaction) => {
    try {
      const { member } = interaction;
      const { guild } = member;

      var embeds = [
        new MessageEmbed()
          .setColor(ee.color)
          .setTitle(`📃 Queue of __${message.guild.name}__`)
          .setDescription(`**Currently there are __0 Songs__ in the Queue**`)
          .setThumbnail(message.guild.iconURL({
            dynamic: true
          })),
        new MessageEmbed()
          .setColor(ee.color)
          .setFooter(message.guild.name, message.guild.iconURL({
            dynamic: true
          }))
          .setImage(message.guild.banner ? message.guild.bannerURL({
            size: 4096
          }) : `https://imgur.com/jLvYdb4.png`)
          .setTitle(`Start Listening to Music, by connecting to a Voice Channel and sending either the **SONG LINK** or **SONG NAME** in this Channel!`)
          .setDescription(`> *I support <:Youtube:840260133686870036> Youtube, <:Spotify:846090652231663647> Spotify, <:soundcloud:825095625884434462> Soundcloud and direct MP3 Links!*`)
      ]
      var Emojis = [
        `0️⃣`,
        `1️⃣`,
        `2️⃣`,
        `3️⃣`,
        `4️⃣`,
        `5️⃣`,
        `6️⃣`,
        `7️⃣`,
        `8️⃣`,
        `9️⃣`,
        `🔟`,
        `🟥`,
        `🟧`,
        `🟨`,
        `🟩`,
        `🟦`,
        `🟪`,
        `🟫`,
      ]
      //now we add the components!
      var components = [
        new MessageActionRow().addComponents([
          new MessageSelectMenu()
            .setCustomId(`MessageSelectMenu`)
            .addOptions([`Pop`, `Strange-Fruits`, `Gaming`, `Chill`, `Rock`, `Jazz`, `Blues`, `Metal`, `Magic-Release`, `NCS | No Copyright Music`, `Default`].map((t, index) => {
              return {
                label: t.substr(0, 25),
                value: t.substr(0, 25),
                description: `Load a Music-Playlist: '${t}'`.substr(0, 50),
                emoji: Emojis[index]
              }
            }))
        ]),
        new MessageActionRow().addComponents([
          new MessageButton().setStyle('PRIMARY').setCustomId('Skip').setEmoji(`⏭`).setLabel(`Skip`).setDisabled(),
          new MessageButton().setStyle('DANGER').setCustomId('Stop').setEmoji(`🏠`).setLabel(`Stop`).setDisabled(),
          new MessageButton().setStyle('SECONDARY').setCustomId('Pause').setEmoji('⏸').setLabel(`Pause`).setDisabled(),
          new MessageButton().setStyle('SUCCESS').setCustomId('Autoplay').setEmoji('🔁').setLabel(`Autoplay`).setDisabled(),
          new MessageButton().setStyle('PRIMARY').setCustomId('Shuffle').setEmoji('🔀').setLabel(`Shuffle`).setDisabled(),
        ]),
        new MessageActionRow().addComponents([
          new MessageButton().setStyle('SUCCESS').setCustomId('Song').setEmoji(`🔁`).setLabel(`Song`).setDisabled(),
          new MessageButton().setStyle('SUCCESS').setCustomId('Queue').setEmoji(`🔂`).setLabel(`Queue`).setDisabled(),
          new MessageButton().setStyle('PRIMARY').setCustomId('Forward').setEmoji('⏩').setLabel(`+10 Sec`).setDisabled(),
          new MessageButton().setStyle('PRIMARY').setCustomId('Rewind').setEmoji('⏪').setLabel(`-10 Sec`).setDisabled(),
          new MessageButton().setStyle('PRIMARY').setCustomId('Lyrics').setEmoji('📝').setLabel(`Lyrics`).setDisabled(),
        ]),
      ]
      let channel = message.mentions.channels.first();
      if (!channel) return message.reply(`${client.allEmojis.x} **You forgot to ping a Text-Channel!**`)
      channel.send({
        embeds,
        components
      }).then(msg => {
        client.settings.set(message.guild.id, channel.id, `music.channel`);
        client.settings.set(message.guild.id, msg.id, `music.message`);
        //send a success message
        return message.reply(`${client.allEmojis.check_mark} **Successfully setupped the Music System in:** <#${channel.id}>`)
      });

    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  }
}