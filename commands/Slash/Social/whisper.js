const { CommandInteraction } = require('discord.js');

module.exports = {

    name: "whisper",
    description: "Whisper someone",
    options: [
        {
            name: 'user',
            description: 'User to whisper.',
            type: 6,
            required: true
        },
        {
            name: "message",
            description: "The message you want to whisper.",
            type: 3,
            required: true
        }
    ],
    category: "Social",

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @returns 
     */

    run: async (client, interaction) => {

        const member = interaction.options.getMember('user');
        const message = interaction.options.getString('message');
        let fetchUser = await client.users.fetch(member);

        if (!fetchUser) return interaction.reply({ content: `You need to mention someone to Whisper!`, ephemeral: true });
        if (fetchUser.id === interaction.user.id) return interaction.reply({ content: `You can't whisper yourself`, ephemeral: true });
        if (fetchUser.bot) return interaction.reply({ content: `You can't whisper bot's`, ephemeral: true });

        await interaction.reply({ content: `Successfully whispered to \`${fetchUser.username}\``, ephemeral: true });

        fetchUser.send({
            content: [
                `**\`${interaction.user.tag}\` used /whisper in \`${interaction.guild.name}\`**`,
                '```',
                `${message}`,
                '```'
            ].join("\n"),
        })

    }
}