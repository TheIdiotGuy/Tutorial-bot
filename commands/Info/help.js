const { MessageEmbed, MessageButton, Interaction, Client, MessageActionRow, CommandInteraction, Message } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
require(`colors`);

module.exports = {

    name: 'help',
    description: 'The most helpfull command.',
    category: 'Info',

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {

        const uptime = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

        const helpEmbed = new MessageEmbed()
            .setTitle("{botname} | Help Panel".replace(/{botname}/g, "Ochako"))
            .setColor("#5440cd")
            .setDescription([
                `**Hey ${interaction.user}, {botname} here! Below is the Help panel of {botname}. Check for commands in any of the modules given below**`.replace(/{botname}/g, "Ochako"),
                ``,
                `<:SERVERS_STATS:966354942434619472> **{botname} Stats**`.replace(/{botname}/g, "Ochako"),
                ``,
                `> <:BotCommands:966360357134274710> **Commands : ${client.commands.map(a => a).length}**`,
                `> <:guilds:966360594787754054> **Guilds : ${client.guilds.cache.size}**`,
                `> <a:Uptime:966360723166990379> **Uptime : ${uptime}**`,
                `> <a:Stats:966360952461197433> **Ping : ${Math.floor(client.ws.ping)}ms**`,
                ``,
                `<:ochako_menu:955149878458216469> **Modules**`,
                ``,
                `> - <a:ochako_utility:922041157456920626> **Utility**`,
                `> - <:ochako_hammer:955148127260774450> **Admin**`,
                ``,
                `<:links:966617884547768320> **Useful Links**`,
                ``,
                `> <:website:966618467191123968> **[Bot Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)**`,
                `> <:gh_invite:966618610850226216> **[Bot Website](https://theidiotguy.github.io/ochako-bot/)**`
            ].join("\n"))
            .setImage("https://images-ext-1.discordapp.net/external/HFiHCJQVN6BKvmFhDSuJ2K7V_JEbLtKf9SfvBuuF99s/https/i.imgur.com/YkFYZHL.gif")
            .setFooter({ text: "Ochako <3", iconURL: client.user.displayAvatarURL() })
            .setThumbnail(client.user.displayAvatarURL())

        async function capIt(message) {
            const capped = message.charAt(0) + message.slice(1)
            return capped
        }

        async function _(dir, varName) {

            varName = []

            client.commands
                .filter(_cmd => _cmd.category === dir)
                .forEach((_command) => {
                    varName.push(`§ ${_command.name.charAt(0).toUpperCase() + _command.name.slice(1)} : ${_command.description}`)
                })

            return varName.join("\n")
        }

        const testEmb = new MessageEmbed()
            .setTitle("{botname} | Admin Commands".replace(/{botname}/g, "Ochako"))
            .setDescription([
                '```fix',
                `${await _("Admin", "Admin")}`,
                '```'
            ].join("\n"))
            .setFooter({ text: "Ochako <3", iconURL: client.user.displayAvatarURL() })
            .setColor("#5440cd")
            .setThumbnail(client.user.displayAvatarURL())

        const test3Emb = new MessageEmbed()
            .setTitle("{botname} | Info Commands".replace(/{botname}/g, "Ochako"))
            .setDescription([
                '```fix',
                `${await _("Info", "Info")}`,
                '```'
            ].join("\n"))
            .setFooter({ text: "Ochako <3", iconURL: client.user.displayAvatarURL() })
            .setColor("#5440cd")
            .setThumbnail(client.user.displayAvatarURL())

        const test2Emb = new MessageEmbed()
            .setTitle("{botname} | Utility Commands".replace(/{botname}/g, "Ochako"))
            .setDescription([
                '```fix',
                `${await _("Utility", "Utility")}`,
                '```'
            ].join("\n"))
            .setFooter({ text: "Ochako <3", iconURL: client.user.displayAvatarURL() })
            .setColor("#5440cd")
            .setThumbnail(client.user.displayAvatarURL())

        const test4Emb = new MessageEmbed()
            .setTitle("{botname} | Music Commands".replace(/{botname}/g, "Ochako"))
            .setDescription([
                '```fix',
                `${await _("Music", "Music")}`,
                '```'
            ].join("\n"))
            .setFooter({ text: "Ochako <3", iconURL: client.user.displayAvatarURL() })
            .setColor("#5440cd")
            .setThumbnail(client.user.displayAvatarURL())

        const but_1 = new MessageButton()
            .setCustomId('bck')
            .setEmoji("<:Previous:966405885838651442>")
            .setStyle('DANGER');

        const but_2 = new MessageButton()
            .setStyle("LINK")
            .setLabel("Bot Invite")
            .setURL("https://discord.com/api/oauth2/authorize?client_id=957317091147538493&permissions=8&scope=bot%20applications.commands")

        const but_3 = new MessageButton()
            .setStyle("LINK")
            .setLabel("Website")
            .setURL("https://theidiotguy.github.io/ochako-bot/")

        const but_4 = new MessageButton()
            .setCustomId('nxt')
            .setEmoji("<:Next1:966405872089706507>")
            .setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(but_1, but_2, but_3, but_4)
        let embeds = [helpEmbed, testEmb, test2Emb, test3Emb, test4Emb]
        let currentPage = 0;

        if (!interaction.deferred) {
            await interaction.deferReply();
        }

        let help_panel = await interaction.editReply({
            embeds: [helpEmbed],
            components: [row],
            ephemeral: true,
            fetchReply: true
        })

        // const filter = (i) => i.user.id === interaction.user.id;

        const collector = await help_panel.createMessageComponentCollector({
            // filter,
            time: 180e3,
        });

        collector.on('collect', async (i) => {
            if (i.customId === "bck") {
                if (currentPage !== 0) {
                    currentPage -= 1
                } else {
                    currentPage = embeds.length - 1
                }
            }
            else if (i.customId == "nxt") {
                if (currentPage < embeds.length - 1) {
                    currentPage++;
                } else {
                    currentPage = 0
                }
            }

            if (i.user.id === interaction.user.id) {
                await i.update({ embeds: [embeds[currentPage]], components: [row] }).catch(e => { })
            } else {
                i.reply({ content: `You are not the author of the command, so you cant use these buttons.`, ephemeral: true });
            }
        });

        collector.on('end', async (_, reason) => {
            if (reason !== "messageDelete") {
                let disabled = new MessageActionRow().addComponents([but_1.setDisabled(true), but_2, but_3, but_4.setDisabled(true)])
                const alldisabledbuttons = [disabled]

                await help_panel.edit({
                    embeds: [
                        new MessageEmbed()
                            .setTitle("{botname} | Help Panel".replace(/{botname}/g, "Ochako"))
                            .setDescription([
                                `**Hey ${interaction.user}, {botname} here! You can trigger the help panel again by using \`/help\` anytime.**`.replace(/{botname}/g, "Ochako"),
                                '',
                                '> **The Help Panel has been expired.**'
                            ].join("\n"))
                            .setFooter({ text: "Ochako <3", iconURL: client.user.displayAvatarURL() })
                            .setColor("#5440cd")
                            .setThumbnail(client.user.displayAvatarURL())
                    ],
                    components: alldisabledbuttons
                }).catch((e) => { })
            }
        });
    }
}