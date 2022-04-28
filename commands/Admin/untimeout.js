module.exports = {
	name: 'unmute',
	description: 'Remove mute from user.',
	options: [
		{
			name: 'user',
			description: 'User to remove mute from.',
			type: 6,
			required: true,
		},
	],
	category: 'Admin',
	run: async (client, interaction) => {
		const member = interaction.options.getMember('user');
		if (!member.isCommunicationDisabled()) {
			return interaction
				.reply({
					content: ':x: This user is not in muted.',
					ephemeral: true,
				})
				.catch((e) => {});
		}
		await member.disableCommunicationUntil(null, `By: ${interaction.user.tag}`);
		interaction.reply({
			content: `Mute has been removed from ${member}`,
		});
	},
};
