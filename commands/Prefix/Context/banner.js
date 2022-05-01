const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'User Banner',
    type: 3,
    run: async (client, interaction) => {
        const message = interaction.options.getMessage('message');
        const user = await client.users.cache.get(message.author.id);
        await user.fetch();
        if (!user.banner) {
            return interaction.reply({ content: ":x: This user doesn't have a banner", ephemeral: true });
        }
        try {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                        .setImage(message.author.bannerURL({ dynamic: true, format: 'png', size: 4096 }))
                        .setColor("#5440cd")
                ],
                component: [
                    new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setStyle("LINK")
                                .setURL(message.author.bannerURL({ dynamic: true }))
                                .setLabel("Banner Url")
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
    },
};