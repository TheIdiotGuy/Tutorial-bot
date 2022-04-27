const { MessageEmbed, Client, CommandInteraction, version, MessageActionRow, MessageButton } = require('discord.js');
const moment = require("moment");
const config = require("../../config.json");
require("moment-duration-format");
require(`colors`);

module.exports = {

    name: 'stats',
    description: 'Shows the bot stats.',
    category: 'Info',

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {

        const uptime = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const _getTag = async (userID) => {
            const _ = await client.users.fetch(userID);
            return _.tag;
        }
        await interaction.deferReply({ ephemeral: true })
        await interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`{botname} | Stats`.replace(/{botname}/i, "Ochako"))
                    .setDescription([
                        '```fix',
                        `§ Name        : ${client.user.tag}`,
                        `§ Description : Most advanced Discord bot`,
                        `§ Commands    : ${client.commands.map(a => a).length}`,
                        `§ Guilds      : ${client.guilds.cache.size} Guilds`,
                        `§ Users       : ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} Members`,
                        `§ Ping        : ${Math.floor(client.ws.ping)} ms`,
                        `§ Uptime      : ${uptime}`,
                        `§ Developer   : ${await _getTag(config.dev_id)}`,
                        `§ DiscordJS   : ${version}`,
                        `§ Node        : ${process.version}`,
                        `§ OS          : ${process.platform}`,
                        '```'
                    ].join("\n"))
                    .setFooter({ text: "Ochako <3", iconURL: client.user.displayAvatarURL() })
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("#5440cd")
            ],
            components: [
                new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel("Bot Source")
                            .setStyle("LINK")
                            .setURL("https://github.com/TheIdiotGuy/Tutorial-bot")
                    )
            ],
            ephemeral: true
        })
    }
}