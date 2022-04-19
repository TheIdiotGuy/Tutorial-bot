const { Interaction, Client } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = {
    name: "interactionCreate",
    run: async (client, interaction) => {

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
                command.run(client, interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: ':x: There was an error while executing this command!', ephemeral: true });
            }
        }

    }
}