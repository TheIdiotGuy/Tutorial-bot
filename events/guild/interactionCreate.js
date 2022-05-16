const { Interaction } = require("discord.js");
const client = require("../../utils/client");
const config = require("../../config.json");
const { E } = require("../../utils/error");
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
                    return interaction.reply({
                        embeds: [
                            {
                                title: "Owner Only Command",
                                description: [
                                    `**This command can only be executed by server owner.**`
                                ].join("\n"),
                                color: "#5440cd"
                            }
                        ]
                    })
                }
            }

            if (command.devOnly) {
                if (interaction.user.id !== config.dev_id) {
                    return interaction.reply({
                        embeds: [
                            {
                                title: "Developer Only Command",
                                description: [
                                    `**This command can only be executed by bot developer.**`
                                ].join("\n"),
                                color: "#5440cd"
                            }
                        ]
                    })
                }
            }

            const _Dev = async (userID) => {
                const _ = await client.users.fetch(userID);
                return _.tag;
            }

            if (
                config.under_maintenance &&
                interaction.commandName === command.name &&
                interaction.user.id !== config.dev_id
            ) {
                await interaction.reply({ content: `**Ochako under maintenance.**\n> **Only the developer ( \`${await _Dev(config.dev_id)}\` ) can use commands.**`, ephemeral: true })
            } else {
                try {
                    command.run(client, interaction);
                } catch (err) {
                    E.sendDev(interaction, err)
                }
            }

        } catch (error) {

            console.error(error);
            await interaction.reply({ content: ':x: There was an error while executing this command!', ephemeral: true });

        }
    }

}