const { MessageEmbed, MessageButton, MessageActionRow, Client, Interaction } = require('discord.js');
require(`colors`);

module.exports = {

    name: 'ban',
    description: 'Bans user from the Guild.',
    category: 'Admin',
    options: [
        {
            name: 'user',
            description: 'user to ban',
            type: 6,
            required: true
        },
        {
            name: 'reason',
            description: 'reason of banning this member',
            type: 3
        }
    ],

    /**
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @returns 
     */

    run: async (client, interaction) => {

        const user = interaction.options.getUser('user') || null;
        const reason = interaction.options.getString('reason') || "No Reason"

        try {

            const x = await interaction.guild.members.fetch(user)

        } catch (e) {

            await interaction.reply({ content: ":x: i can't find this user", ephemeral: true });
            return;

        }

        const fetchUser = await interaction.guild.members.fetch(user);

        if (!interaction.member.permissions.has("BAN_MEMBERS")) {
            await interaction.reply({
                content: "You are missing the perms : `BAN_MEMBERS`",
                ephemeral: true
            })
            return;
        }

        if (fetchUser.id === interaction.user.id) {
            await interaction.reply({
                content: "You can't ban yourself",
                ephemeral: true
            })
            return;
        }

        if (fetchUser.id === client.user.id) {
            await interaction.reply({
                content: "You can't ban me",
                ephemeral: true
            })
            return;
        }

        if (!interaction.guild.me.permissions.has("BAN_MEMBERS")) {
            await interaction.reply({
                content: "I am missing the perms : `BAN_MEMBERS`",
                ephemeral: true
            })
            return;
        }

        if (!fetchUser.bannable) {
            await interaction.reply({
                content: "Unable to ban that user.",
                ephemeral: true
            })
            return;
        }

        fetchUser.ban({ reason: reason, days: 7 }).then(async () => {
            await interaction.reply(`Banned ${fetchUser}`)
        })

    }
}