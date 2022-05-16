const Discord = require('discord.js');

module.exports = {

    name: 'embed',
    description: 'Custom embeds.',
    options: [
        {
            name: "title",
            description: "The embed title",
            type: 3
        },
        {
            name: "description",
            description: "The embed description ( add +n for line breaks )",
            type: 3
        },
        {
            name: "color",
            description: "The embed hex color code",
            type: 3
        },
    ],
    category: 'Admin',

    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.CommandInteraction} interaction 
     */

    run: async (client, interaction) => {

        let title = interaction.options.getString("title") || "Ochako | Embed";
        let description = interaction.options.getString("description") || "";
        let color = interaction.options.getString("color") || "#5440cd";

        let descArr = description.split("+n");
        // console.log(descArr.join("\n"))


        interaction.reply({
            embeds: [
                {
                    title: title,
                    description: descArr.join("\n"),
                    color: color
                }
            ],
            ephemeral: true
        })

    },
};
