const { MessageEmbed } = require('discord.js');

module.exports = {

	name: 'role',
	description: 'Passes a role.',
	options: [
		{
			name: 'bots',
			description: 'Pass a role to all bots.',
			type: 1,
			options: [
				{
					name: 'type',
					description: 'pick a type',
					type: 3,
					required: true,
					choices: [
						{
							name: 'Give',
							value: 'give',
						},
						{
							name: 'Remove',
							value: 'remove',
						},
					],
				},
				{
					name: 'role',
					description: 'Role to give all bots.',
					type: 8,
					required: true,
				},
			],
		},
		{
			name: 'user',
			description: 'Pass a role to a specific user.',
			type: 1,
			options: [
				{
					name: 'user',
					description: 'user to give a role.',
					type: 6,
					required: true,
				},
				{
					name: 'role',
					description: 'Role to give a user.',
					type: 8,
					required: true,
				},
			],
		},
		{
			name: 'all',
			description: 'Pass a role to all members.',
			type: 1,
			options: [
				{
					name: 'type',
					description: 'Pick a type',
					type: 3,
					required: true,
					choices: [
						{
							name: 'Give',
							value: 'give',
						},
						{
							name: 'Remove',
							value: 'remove',
						},
					],
				},
				{
					name: 'role',
					description: 'role to give',
					type: 8,
					required: true,
				},
			],
		},
	],
	category: 'Admin',

	run: async (client, interaction) => {

		const user = interaction.options.getMember('user');
		const role = interaction.options.getRole('role');

		if (interaction.options.getSubcommand() === 'user') {
			const botRole = interaction.guild.me.roles.highest.position;
			const roleToGet = user.roles.highest.position;
			const authorRole = interaction.member.roles.highest.position;
			if (authorRole <= roleToGet) {
				const embed = new MessageEmbed()
					.setTitle(
						"I can't role this member because that member has role position is higher than my role or same as you!",
					)
					.setColor('#ff0000');
				return interaction.reply({ embeds: [embed] });
			}

			if (botRole <= roleToGet) {
				const embed = new MessageEmbed()
					.setTitle(
						"I can't role this member because that member has role position is higher than my role or same as you!",
					)
					.setColor('#ff0000');
				return interaction.reply({ embeds: [embed] });
			}

			let addRoles;

			if (user._roles.includes(role.id)) {
				addRoles = '-';
				user.roles.remove(role, `By: ${interaction.user.tag}`);
				interaction.reply({
					content: `✅ Changed role for ${user}, **${addRoles}${role.name}**`,
				});
			} else {
				addRoles = '+';
				user.roles.add(role, `By: ${interaction.user.tag}`);
				interaction.reply({
					content: `✅ Changed role for ${user}, **${addRoles}${role.name}**`,
				});
			}
		}
		
		if (interaction.options.getSubcommand() === 'bots') {
			if (interaction.options._hoistedOptions.find((r) => r.value === 'give')) {
				(await interaction.guild.members.fetch())
					.filter((r) => r.user.bot)
					.forEach((bot) => {
						bot.roles.add(role, `By: ${interaction.user.tag}`);
					});
				const totalBots = (await interaction.guild.members.fetch()).filter((r) => r.user.bot).size;
				return interaction.reply({
					content: `✅ Changed role for **${totalBots}** bots, **+${role.name}**`,
				});
			}
			if (interaction.options._hoistedOptions.find((r) => r.value == 'remove')) {
				(await interaction.guild.members.fetch())
					.filter((r) => r.user.bot)
					.forEach((bot) => {
						bot.roles.remove(role, `By: ${interaction.user.tag}`);
					});
				const totalBots = (await interaction.guild.members.fetch()).filter((r) => r.user.bot).size;
				return interaction.reply({
					content: `✅ Changed role for **${totalBots}** bots, **-${role.name}**`,
				});
			}
		}

		if (interaction.options.getSubcommand() === 'all') {
			if (interaction.options._hoistedOptions.find((r) => r.value === 'give')) {
				(await interaction.guild.members.fetch()).forEach((member) => {
					member.roles.add(role, `By: ${interaction.user.tag}`);
				});
				const memberSize = (await interaction.guild.members.fetch()).size;
				return interaction.reply({
					content: `✅ Changed role for ${memberSize} members, **+${role.name}**`,
				});
			}
			if (interaction.options._hoistedOptions.find((r) => r.value === 'remove')) {
				(await interaction.guild.members.fetch()).forEach((member) => {
					member.roles.remove(role, `By: ${interaction.user.tag}`);
				});
				const memberSize = (await interaction.guild.members.fetch()).size;
				return interaction.reply({
					content: `✅ Changed role for **${memberSize}** members, **-${role.name}**`,
				});
			}
		}
		
	},
};
