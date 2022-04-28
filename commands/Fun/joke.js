const axios = require('axios');

module.exports = {
	name: 'joke',
	description: 'Get random joke',
	category: 'Fun',
	run: async (client, interaction) => {
		await interaction.deferReply();
		const url = 'https://some-random-api.ml/joke';
		const req = await axios.get(url);
		const data = req.data;
		interaction.editReply(data.joke);
	},
};
