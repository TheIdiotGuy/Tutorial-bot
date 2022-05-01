const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "support",
  category: "Info",
  description: "Sends a Link of the Support Server",

  run: async (client, interaction) => {

    try {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Usefull Links")
            .setDescription("> **Our support server!**")
            .setColor("#5440cd")
        ],
        components: [
          new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setLabel("Support Server")
                .setStyle("LINK")
                .setURL("")
            )
        ],
        ephemeral: true
      });
    } catch (e) {
      console.log(String(e.stack))
    }

  }
}