const { MessageEmbed, Interaction, Client } = require("discord.js");
const { E } = require("../../../utils/error");

module.exports = {

    name: "membercount",
    description: "Shows total members in a servers!",
    category: "Info",

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    run: async (client, interaction) => {

        try {

            await interaction.guild.members.fetch();
            await interaction.reply({
                content: [
                    '```',
                    `Total Users  : ${interaction.guild.memberCount}`,
                    `Total Humans : ${interaction.guild.members.cache.filter(member => !member.user.bot).size}`,
                    `Total Bots   : ${interaction.guild.members.cache.filter(member => member.user.bot).size}`,
                    `Online       : ${interaction.guild.members.cache.filter(member => member.presence && member.presence.status === 'online').size}`,
                    `Idle         : ${interaction.guild.members.cache.filter(member => member.presence && member.presence.status === 'idle').size}`,
                    `Dnd          : ${interaction.guild.members.cache.filter(member => member.presence && member.presence.status === 'dnd').size}`,
                    `Offline      : ${interaction.guild.members.cache.filter(member => member.presence && member.presence.status === 'offline').size}`,
                    '```'
                ].join("\n")
            })

        } catch (err) {

            E.sendDev(interaction, err);

        }

    }

}