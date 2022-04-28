const { Interaction } = require("discord.js");
const client = require("../../utils/client");
const config = require("../../config.json");

/**
 * 
 * @param {client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {

    if (interaction.isCommand() || interaction.isContextMenu()) {

        if (!client.commands.has(interaction.commandName)) return;
        if (!interaction.guild) return;

        const command = client.commands.get(interaction.commandName)

        try {

            if (command.permissions) {
                if (!interaction.member.permissions.has(command.permissions)) {
                    const embed = new MessageEmbed()
                        .setTitle('Missing Permission')
                        .setDescription(`:x: You need \`${command.permissions}\` to use this command`)
                        .setColor('#ff0000')
                        .setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
                        .setTimestamp()
                    return interaction.reply({ embeds: [embed], ephemeral: true })
                }
            }

            if (command.ownerOnly) {
                if (interaction.user.id !== interaction.guild.ownerId) {
                    return interaction.reply({ content: "Only ownership of this server can use this command", ephemeral: true })
                }
            }

            const _Dev = async (userID) => {
                const _ = await client.users.fetch(userID);
                return _.tag;
            }

            if (
                config.under_maintenance &&
                interaction.user.id !== config.dev_id &&
                interaction.commandName === command.name
            ) {
                await interaction.reply({ content: `**Ochako under maintenance.**\n> **Only the developer ( \`${await _Dev(config.dev_id)}\` ) can use commands.**`, ephemeral: true })
            } else {
                try {
                    command.run(client, interaction);
                } catch (err) {
                    interaction.reply({
                        content: `**Command didn't respond!**\n> **Error Message** : \`${err.message}\``,
                        ephemeral: true
                    })
                }
            }

        } catch (error) {

            console.error(error);
            await interaction.reply({ content: ':x: There was an error while executing this command!', ephemeral: true });

        }
    }

}