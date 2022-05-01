const ms = require('ms');
const humanizeDuration = require('humanize-duration');

module.exports = {

	name: 'mute',
	description: 'Mute user from a Guild.',
	options: [
		{
			name: 'user',
			description: 'User to mute.',
			type: 6,
			required: true,
		},
		{
			name: 'time',
			description: 'Time for user to mute. example: (1m, 1d, 1mo).',
			type: 3,
			required: true,
		},
	],
	category: 'Admin',

	run: async (client, interaction) => {

		const member = interaction.options.getMember('user');
		const time = interaction.options.getString('time');

		if (member.permissions.has('ADMINISTRATOR')) {
			return interaction
				.reply({
					content: "You can't mute member with **Administrator** permission.",
					ephemeral: true,
				})
				.catch((e) => {});
		}

		await member.disableCommunicationUntil(Date.now() + ms(time), `By: ${interaction.user.tag}`).catch(console.error);
		interaction.reply({
			content: `${member} has been muted for **${humanizeDuration(ms(time), { round: true })}.**`,
		});
	
	},
};
