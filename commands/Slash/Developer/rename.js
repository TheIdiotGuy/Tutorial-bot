const { MessageEmbed } = require("discord.js");
const { E } = require("../../../utils/error");

module.exports = {

    name: "rename",
    description: "Change the bot's username!",
    category: "Developer",
    devOnly: true,
    options: [
        {
            name: "name",
            description: "The new name for the bot.",
            type: 3,
            required: true
        }
    ],

    run: async (client, interaction) => {

        try {

            const newName = interaction.options.getString("name") || "Ochako";
            const maxLength = 32;

            if (newName.length > maxLength) return interaction.reply({ content: "Name must be between 1-32 characters!", ephemeral: true });

            client.user.setUsername(newName)
                .then(user => {
                    return interaction.reply({ content: `**Successfully renamed to:** \`${user.username}\``, ephemeral: true });
                })
                .catch(e => {
                    E.sendDev(interaction, e)
                    return interaction.reply({ content: `Something gone wrong | Notified the developer!`, ephemeral: true });
                })

        } catch (err) {

            E.sendDev(interaction, err);

        }

    }

}