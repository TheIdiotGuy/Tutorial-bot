const X = require("discord.js");

class ErrorHandler {

    constructor() {
        this.client = require("../utils/client");
        this.config = require("../config.json");
        this.error = new Map();
    }

    async sendDev(_, __) {
        const _getTag = async (userID) => {
            const _ = await this.client.users.fetch(userID);
            return _.tag;
        }

        /**
         * @type {X.GuildMember} ___
         */

        let ___ = await this.client.users.fetch(this.config.dev_id).catch(() => null);
        const clean = (text) => {
            text = String(text);
            let splitted = text.split('\n');
            return splitted[0];
        }
        ___.send({
            content: `${___}`,
            embeds: [
                {
                    author: {
                        name: "{botname} | Error Handler".replace(/{botname}/i, this.client.user.username),
                        iconURL: this.client.user.displayAvatarURL({ dynamic: true })
                    },
                    description: [
                        `> **Hey ${await _getTag(this.config.dev_id)}, Caught a new Error!**`,
                        '```',
                        'Fix it as soon as possible!',
                        '```'
                    ].join("\n"),
                    fields: [
                        { name: "<a:error:969810795280097360> Error", value: ['```fix', clean(__), '```'].join("\n"), inline: false },
                        { name: "<:BotCommands:966360357134274710> Command", value: ['```fix', _.commandName.charAt(0).toUpperCase() + _.commandName.slice(1), '```'].join("\n"), inline: true },
                        { name: "<:guilds:966360594787754054> Guild", value: ['```fix', _.guild?.name, '```'].join("\n"), inline: true },
                        { name: "<:user:969811302287568927> User", value: ['```fix', _.user?.tag, '```'].join("\n"), inline: true },
                    ],
                    color: "#5440cd",
                    footer: {
                        text: "Ochako <3",
                        iconURL: this.client.user.displayAvatarURL({ dynamic: true })
                    },
                    timestamp: Date.now(),
                    thumbnail: {
                        url: this.client.user.displayAvatarURL({ dynamic: true })
                    }
                }
            ]
        })
    }

}

module.exports.ErrorHandler = ErrorHandler;