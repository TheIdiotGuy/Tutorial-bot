const { Client, CommandInteraction, MessageActionRow } = require("discord.js");
const { E } = require("../../../utils/error");
const { readdirSync } = require("fs");
const wait = require("node:timers/promises").setTimeout;

module.exports = {

    name: "invite",
    description: "Get Invite!",
    category: "Utility",
    devOnly: true,
    options: [
        {
            name: "choice",
            description: "Choose the invite you want!",
            type: 3,
            choices: [
                {
                    name: 'Support',
                    value: 'support',
                },
                {
                    name: 'Bot',
                    value: 'bot',
                },
            ],
        }
    ],

    /**
     * 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {

        try {

            const choice = interaction.options.getString("choice");

            if (choice === 'support') {
                return interaction.reply({
                    components: [
                        {
                            type: "ACTION_ROW",
                            components: [
                                {
                                    type: "BUTTON",
                                    label: "Support Server",
                                    style: "LINK",
                                    url: "https://discord.gg/sXc8tTVMC2"
                                }
                            ]
                        }
                    ]
                });
            } else if (choice === 'bot') {
                return interaction.reply({
                    components: [
                        {
                            type: "ACTION_ROW",
                            components: [
                                {
                                    type: "BUTTON",
                                    label: "Bot Invite",
                                    style: "LINK",
                                    url: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`
                                }
                            ]
                        }
                    ]
                });
            }

        } catch (err) {
            E.sendDev(interaction, err);
            return interaction.reply({ content: "An error occured | Notified the developer.", ephemeral: true })
        }

    }

}