const Discord = require('discord.js');

module.exports = {
	name: 'channels',
	description: 'Shows channel count',
	options: [
		{
			name: 'type',
			description: 'Type of channel to show.',
			type: 3,
			required: true,
			choices: [
				{
					name: 'Text',
					value: 'text',
				},
				{
					name: 'Voice',
					value: 'voice',
				},
				{
					name: 'Category',
					value: 'category',
				},
			],
		},
	],
	category: 'Utility',
	run: async (client, interaction) => {
		const type = interaction.options.getString('type');
		if (type === 'text') {
			let num = 0;
			let loop = '';
			interaction.guild.channels.cache
				.filter((r) => r.type === 'GUILD_TEXT')
				.forEach((channel) => {
					num++;
					loop += `**#${num}** - ${channel}\n`;
				});
			return interaction.reply({
				content: `**\`💬\` ${interaction.guild.name}** Text Channels :\n${loop}`,
			});
		}
		if (type === 'voice') {
			let num = 0;
			let loop = '';
			interaction.guild.channels.cache
				.filter((r) => r.type === 'GUILD_VOICE')
				.forEach((channel) => {
					num++;
					loop += `**#${num}** - ${channel}\n`;
				});
			return interaction.reply({
				content: `**\`🔊\` ${interaction.guild.name}** Voice Channels :\n${loop}`,
			});
		}
		if (type === 'category') {
			let num = 0;
			let loop = '';
			interaction.guild.channels.cache
				.filter((r) => r.type === 'GUILD_CATEGORY')
				.forEach((channel) => {
					num++;
					loop += `**#${num}** - ${channel.name}\n`;
				});
			interaction.reply({
				content: `**\`📂\` ${interaction.guild.name}** Category Channels : \n${loop}`,
			});
		}
	},
};
