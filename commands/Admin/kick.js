const { MessageEmbed, MessageButton, MessageActionRow, Client, Interaction } = require('discord.js');
require(`colors`);
const wait = require('node:timers/promises').setTimeout;

module.exports = {

    name: 'kick',
    description: 'Kicks user from the Guild',
    timeout: 5000,
    category: 'Admin',
    options: [
        {
            name: 'user',
            description: 'user to kick',
            type: 6,
            required: true
        },
        {
            name: 'reason',
            description: 'reason of kicking this member',
            type: 3
        }
    ],

    /**
     * 
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

        if (!interaction.member.permissions.has("KICK_MEMBERS")) {
            await interaction.reply({
                content: "You are missing the perms : `KICK_MEMBERS`",
                ephemeral: true
            })
            return;
        }

        if (fetchUser.id === interaction.user.id) {
            await interaction.reply({
                content: "You can't kick yourself",
                ephemeral: true
            })
            return;
        }

        if (fetchUser.id === client.user.id) {
            await interaction.reply({
                content: "You can't kick me",
                ephemeral: true
            })
            return;
        }

        if (!interaction.guild.me.permissions.has("KICK_MEMBERS")) {
            await interaction.reply({
                content: "I am missing the perms : `KICK_MEMBERS`",
                ephemeral: true
            })
            return;
        }

        if (!fetchUser.kickable) {
            await interaction.reply({
                content: "Unable to kick that user.",
                ephemeral: true
            })
            return;
        }

        fetchUser.kick(reason).then(async () => {
            await interaction.reply(`Kicked ${fetchUser}`)
        })

    }
}