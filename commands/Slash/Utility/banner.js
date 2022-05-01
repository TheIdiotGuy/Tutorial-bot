const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
require(`colors`);

module.exports = {

    name: 'banner',
    description: 'Banner of User',
    timeout: 5000,
    category: 'Utility',
    options: [
        {
            name: 'user',
            description: 'user to get banner for',
            type: 6,
        },
    ],

    run: async (client, interaction) => {

        const user = interaction.options.getUser('user') || interaction.user;

        try {

            await client.users.fetch(user);

        } catch (e) {

            return interaction.reply({ content: ":x: i can't find this user" });

        }
        
        const fetchUser = await client.users.fetch(user);
        await fetchUser.fetch();

        const embed = new MessageEmbed()
            .setAuthor({ name: fetchUser.tag, iconURL: fetchUser.displayAvatarURL({ dynamic: true }) })
            .setImage(fetchUser.bannerURL({ dynamic: true, size: 4096, format: 'png' }))
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });


        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setURL(`https://cdn.discordapp.com/banners/${fetchUser.id}/${fetchUser.banner}?size=512`)
                    .setLabel('User Banner'),
            );

        if (fetchUser.banner === null) {
            await interaction.reply("User doesnt have any banner")
        } else {
            await interaction.reply({
                embeds: [embed],
                components: [row]
            });
        }

    }
}