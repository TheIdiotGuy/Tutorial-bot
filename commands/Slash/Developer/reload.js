const { Client, CommandInteraction } = require("discord.js");
const { E } = require("../../../utils/error");
const { _Handler } = require("../../../index");
const { readdirSync } = require("fs");
const wait = require("node:timers/promises").setTimeout;

module.exports = {

    name: "reload",
    description: "Change the bot's username!",
    category: "Developer",
    devOnly: true,
    options: [
        {
            name: "cmd-name",
            description: "The name of the command you want to reload.",
            type: 3,
        }
    ],

    /**
     * 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {

        try {

            const passedString = interaction.options.getString("cmd-name");

            if (passedString) {

                let getCommand = client.commands.get(passedString.toLowerCase());

                if (getCommand) {

                    try {

                        delete require.cache[require.resolve(`../../../commands/Slash/${getCommand.category}/${getCommand.name}.js`)];
                        client.commands.delete(getCommand.name);
                        const pull = require(`../../../commands/Slash/${getCommand.category}/${getCommand.name}.js`);
                        client.commands.set(getCommand.name, pull);

                        return interaction.reply({ content: `Reloaded : ${passedString}`, ephemeral: true })

                    } catch (err) {
                        E.sendDev(interaction, err);
                        return interaction.reply({ content: `Couldn't reload : ${passedString}`, ephemeral: true })
                    }

                } else {
                    return interaction.reply({ content: `No command exists with the name : ${passedString}`, ephemeral: true })
                }

            } else {

                let e_count = 0;
                readdirSync("./events/").forEach(async (dir) => {
                    const events = readdirSync(`./events/${dir}/`).filter((file) => file.endsWith(".js"));
                    e_count += events.length
                })

                await interaction.reply({
                    embeds: [
                        {
                            color: "#5440cd",
                            author: {
                                name: "Reloading ...",
                                iconURL: "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif",
                                url: "https://discord.gg/sXc8tTVMC2"
                            },
                            description: [
                                `> Reloading **\`${client.commands.size} Commands\`**`,
                                `> Reloading **\`${e_count} Events\`**`
                            ].join("\n")
                        }
                    ]
                })

                await client.commands.clear();

                const loadCmd = async (fold) => {
                    readdirSync(`./commands/${fold}/`).forEach((dir) => {
                        const folder = readdirSync(`./commands/${fold}/${dir}/`).filter((files) => { files.endsWith(".js") });
                        for (let file of folder) {
                            try {
                                delete require.cache[require.resolve(`../../../commands/${fold}/${dir}/${file}.js`)]
                                interaction.reply(`SUCCESS :: ../../../commands/${fold}/${dir}/${file}.js`)
                            } catch (err) {
                                E.sendDev(interaction, err);
                                console.log(err)
                            }
                        }
                    })
                }

                const categ = ["Prefix", "Slash"];
                categ.forEach((_) => {
                    loadCmd(_);
                })

                function clearConsoleAndScrollbackBuffer() {
                    process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
                    console.clear();
                }

                await wait(1000);
                client.removeAllListeners();
                await wait(1000);
                clearConsoleAndScrollbackBuffer();
                await _Handler._init()
                console.log(client.commands.map(cmd => cmd.name));
                await interaction.editReply({
                    embeds: [
                        {
                            color: "#5440cd",
                            author: {
                                name: "Reloaded!",
                                iconURL: "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif",
                                url: "https://discord.gg/sXc8tTVMC2"
                            },
                            description: [
                                `> **\`${client.commands.size} Commands\`**`,
                                `> **\`${e_count} Events\`**`
                            ].join("\n")
                        }
                    ]
                })

            }

        } catch (err) {

            E.sendDev(interaction, err);

        }

    }

}