module.exports = {

	name: 'lock',
	description: 'Locks a Channel for non perms user.',
	options: [
		{
			name: 'channel',
			description: 'Channel to lock.',
			type: 7,
			channel_types: [0],
		},
	],
	category: 'Admin',

	run: async (client, interaction) => {

		const channel = interaction.options.getChannel('channel') || interaction.channel;

		const isLocked = channel.permissionOverwrites.cache
			.find((r) => r.id === interaction.guild.id)
			.deny.has('SEND_MESSAGES');

		if (isLocked) {
			return interaction.reply({ content: `**:x: #${channel.name} already locked.**` });
		}
		
		await channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: false });
		interaction.reply({ content: `**🔒 ${channel} has been locked.**` });
	
	},
};
