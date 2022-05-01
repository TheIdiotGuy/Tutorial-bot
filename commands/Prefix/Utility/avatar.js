const Discord = require('discord.js');

module.exports = {

    name: 'avatar',
    description: 'Get user avatar',
    options: [
        {
            name: 'user',
            description: 'User to get avatar',
            type: 6,
        },
        {
            name: 'server_avatar',
            description: 'Get member avatar in this server',
            type: 5,
        },
    ],
    category: 'Utility',

    run: async (client, interaction) => {

        const member = interaction.options.getMember('user') || interaction.member;
        const isMemberAvatar = interaction.options.getBoolean('server_avatar');

        if (isMemberAvatar) {
            if (!member.avatar) {
                return interaction.reply({
                    content: ":x: This user don't has avatar in this server",
                    ephemeral: true,
                });
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor({ name: member.user.tag, iconURL: member.avatarURL({ dynamic: true }) })
                .setDescription(`[Avatar Link](${member.avatarURL({ dynamic: true, size: 4096 })})`)
                .setImage(member.avatarURL({ dynamic: true, size: 4096 }))
                .setFooter({ text: `Requested By ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const embed = new Discord.MessageEmbed()
            .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setFooter({ text: `Requested By ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        const url = new Discord.MessageButton()
            .setLabel("Avatar Url")
            .setStyle("LINK")
            .setURL(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
            
        interaction.reply({ embeds: [embed], components: [new Discord.MessageActionRow().addComponents(url)], ephemeral: true });
    },
};
