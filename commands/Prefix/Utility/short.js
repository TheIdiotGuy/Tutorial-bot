const { default: axios } = require('axios');
const Discord = require('discord.js');

module.exports = {
	name: 'short',
	description: 'Short a long url',
	options: [
		{
			name: 'url',
			description: 'Url to short',
			type: 3,
			required: true,
		},
		{
			name: 'pass',
			description: 'Password for url',
			type: 3,
		},
	],
	category: 'Utility',
	run: async (client, interaction) => {
		const url = interaction.options.getString('url');
		const pass = interaction.options.getString('pass') || '';
		const apiToken = ''; // Get your api key from <https://i8.ae/user/tools#api>
		if (!apiToken) {
			return interaction.reply({ content: ':x: Missing api token' });
		}
		try {
			const req = await axios({
				url: 'https://i8.ae/api/url/add',
				method: 'POST',
				headers: {
					Authorization: apiToken,
				},
				data: {
					url: url,
					password: pass,
				},
			});
			const data = req.data;
			const row = new Discord.MessageActionRow().addComponents(
				new Discord.MessageButton().setStyle('LINK').setURL(data.shorturl).setLabel('URL'),
			);
			interaction.reply({ content: '**Short URL:**', components: [row] });
		} catch (e) {
			console.error(e);
			return interaction.reply({ content: `:x: ${e}` });
		}
	},
};
