const axios = require('axios');

module.exports = {
	name: 'djs',
	description: 'Searches in discord.js documentation',
	options: [
		{
			name: 'query',
			description: 'Search query',
			type: 3,
			required: true,
		},
	],
	category: 'Search',
	run: async (client, interaction) => {
		const query = interaction.options.getString('query');
		try {
			const req = await axios.get(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`);
			const data = req.data;
			if (data && !data.error) {
				interaction.reply({ content: data });
			} else {
				return interaction.reply({ content: `:x: There was an error`, ephemeral: true });
			}
		} catch (e) {
			return interaction.reply({ content: e, ephemeral: true });
		}
	},
};
