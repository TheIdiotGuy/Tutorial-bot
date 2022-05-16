const { Message, Client } = require("discord.js")
const config = require("../../config.json");
/**
 * @param {Message} message 
 * @param {Client} client 
 */

module.exports = async (client, message) => {

    // if author is bot dont rply!
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.channel) return;
    if (message.channel.partial) await message.channel.fetch();
    if (message.partial) await message.fetch();

    client.settings.ensure(message.guild.id, {
        prefix: config.prefix,
        bot_channel: [],
        default: {
            volume: 100,
            autoplay: true
        },
        music: {
            channel: "",
            message: ""
        }
    })

    let prefix = client.settings.get(message.guild.id, "prefix");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})`);
    if (!prefixRegex.test(message.content)) return;

    const [, mPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(mPrefix.length).trim().split(/ +/).filter(Boolean);
    const cmd = args.length > 0 ? args.shift().toLowerCase() : null;

    if (!cmd || cmd.length == 0) {
        if (mPrefix.includes(client.user.id)) {
            message.reply({
                embeds: [
                    {
                        title: "Ochako",
                        description: [
                            "**Did you mentioned me? here's some basic help.**",
                            `> **Prefix : ${prefix}**`,
                            "> **Slash Support : Yes!**",
                            `> **Usage : \`${prefix}help\` or \`/help\`**`
                        ].join("\n"),
                        color: "#5440cd"
                    }
                ]
            })
        }
        return;
    }

    let command = client.prefix.get(cmd);
    if (!command) command = client.prefix.get(client.aliases.get(cmd));

    if (command) {
        if (client.settings.get(message.guild.id, "music.channel") === message.channel.id) {
            return message.reply(`> **Please use a Command Somewhere else!**`).then(msg => { setTimeout(() => { try { msg.delete().catch(() => { }); } catch (e) { } }, 3000) }).catch(() => { });
        }

        let bot_channels = client.settings.get(message.guild.id, `bot_channel`);
        if (!bot_channels || !Array.isArray(bot_channels)) bot_channels = [];

        function _() {
            let chnnArray = [];
            let count = 1;

            bot_channels.map(c => {
                chnnArray.push(`${count}. <#${c}>`)
                count += 1;
            });
            return chnnArray.join("\n");
        }

        // Bot command channel statement

        if (bot_channels.length > 0) {
            if (!bot_channels.includes(message.channel.id) && !message.member.permissions.has("ADMINISTRATOR")) {
                return message.reply({
                    embeds: [
                        {
                            title: `Ochako | Error`,
                            description: [
                                `**You cant use this command here! Try in one of these channels**`,
                                `> ${_()}`
                            ].join("\n")
                        }
                    ]
                })
            }
        }

        // Owner only statement

        if (
            command.ownerOnly &&
            message.member.id !== message.guild.ownerId
        ) {
            return message.reply({
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

        // Dev only statement

        if (
            command.devOnly &&
            message.member.id !== config.dev_id
        ) {
            return message.reply({
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


        // Under maintenance statement

        if (
            config.under_maintenance &&
            message.content === command.name &&
            message.member.id !== config.dev_id
        ) {
            return await message.reply({ content: `**Ochako under maintenance.**\n> **Only the developer ( \`${await _Dev(config.dev_id)}\` ) can use commands.**`, ephemeral: true }).then(msg => { setTimeout(() => { try { msg.delete().catch(() => { }); } catch (e) { } }, 3000) }).catch(() => { });
        } else {
            try {
                command.run(client, message, args);
            } catch (err) {
                E.sendDev(message, err)
            }
        }

    }


}

function escapeRegex(str) {
    try {
        return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    } catch {
        return str
    }
}
