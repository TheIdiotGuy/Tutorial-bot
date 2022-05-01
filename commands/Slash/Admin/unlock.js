module.exports = {
	name: 'unlock',
	description: 'Unlock a channel for everyone.',
	options: [
		{
			name: 'channel',
			description: 'Channel to unlock.',
			type: 7,
			channel_types: [0],
		},
	],
	category: 'Admin',
	run: async (client, interaction) => {
		const channel = interaction.options.getChannel('channel') || interaction.channel;
		const isUnlocked = channel.permissionOverwrites.cache
			.find((r) => r.id === interaction.guild.id)
			.deny.has('SEND_MESSAGES');
		if (!isUnlocked) {
			return interaction.reply({ content: `**:x: #${channel.name} already unlocked.**` });
		}
		await channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: null });
		interaction.reply({ content: `**🔓 ${channel} has been unlock.**` });
	},
};
