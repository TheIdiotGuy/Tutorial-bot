const { Client, MessageEmbed, Message } = require("discord.js")

module.exports = {
    name: "prefix",
    aliases: [],
    description: "The bot prefix",
    category: "Setup",
    /**
     * 
     * @param {Client} client
     * @param {Message} message
     */
    async run(client, message, args) {

        try {

            const { member } = message;
            const { guild } = member;

            if (!args[0]) {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("#5440cd")
                            // .setFooter(ee.footertext, ee.footericon)
                            .setTitle(`**Please add a Prefix!**`)
                            .setDescription(`**Usage:**\n> \`${client.settings.get(guild.id, "prefix")}prefix <newPrefix>\``)
                    ],
                })
            }
            let newPrefix = args[0];

            client.settings.set(guild.id, newPrefix, "prefix");
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("#5440cd")
                        // .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`**The new Prefix is now: \`${newPrefix}\`**`)
                ],
            })
        } catch (e) {
            console.log(String(e.stack))
        }

    }
}