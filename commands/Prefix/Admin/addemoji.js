const Discord = require('discord.js');

module.exports = {

	name: 'addemoji',
	description: 'Add\'s emoji to the Guild.',
	options: [
		{
			name: 'emoji',
			description: 'Emoji you want to add to the server',
			type: 3,
			required: true,
		},
		{
			name: 'emoji_name',
			description: 'Name of emoji',
			type: 3,
		},
	],
	category: 'Admin',

	run: async (client, interaction) => {

		const emoji = interaction.options.getString('emoji');
		const emojiName = interaction.options.getString('emoji_name');
		const parseCustomEmoji = Discord.Util.parseEmoji(emoji);
		
		if (parseCustomEmoji.id) {
			const emojiLink = `https://cdn.discordapp.com/emojis/${parseCustomEmoji.id}.${
				parseCustomEmoji.animated ? 'gif' : 'png'
			}`;
			const createEmoji = await interaction.guild.emojis.create(emojiLink, emojiName || parseCustomEmoji.name);
			interaction.reply({
				content: `Added <:${createEmoji.name}:${createEmoji.id}> emoji`,
			});
		} else {
			interaction.reply({
				content: ':x: Not vaild emoji',
				ephemeral: true,
			});
		}

	},
};