const { MessageEmbed } = require('discord.js');
const humanizeDuration = require('humanize-duration');

module.exports = {

    name: 'User Info',
    type: 3,

    run: async (client, interaction) => {

        const message = interaction.options.getMessage('message');
        const userCreated = Date.now() - message.author.createdTimestamp;
        const joinedTime = Date.now() - message.member.joinedTimestamp;
        try {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                        .setColor("#5440cd")
                        .addFields(
                            {
                                name: 'User Created At:',
                                value: `\`${message.author.createdAt.toLocaleString()}\`\n**${humanizeDuration(userCreated, {
                                    largest: 1,
                                })} ago**`,
                            },
                            {
                                name: 'Joined Server',
                                value: `\`${message.member.joinedAt.toLocaleString()}\`\n**${humanizeDuration(joinedTime, {
                                    largest: 1,
                                })} ago**`,
                            },
                            {
                                name: 'User ID:',
                                value: message.author.id,
                            },
                            {
                                name: 'is it a bot?',
                                value: message.author.bot.toString(),
                            },
                        )
                ],
                ephemeral: true
            });
        } catch (err) {
            interaction.reply({
                content: `**Command didn't respond!**\n> **Error Message** : \`${err.message}\``,
                ephemeral: true
            })
        }

    }

};