// const axios = require('axios');
const got = require('got');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'meme',
	description: 'Get a random meme',
	category: 'Fun',
	run: async (client, interaction) => {

		await interaction.deferReply();
		// const url = 'https://meme-api.herokuapp.com/gimme';
		// const req = await axios.get(url);
		// const data = req.data;

		// );
		// interaction.editReply({ files: [data.url], components: [row] });
		const embed = new MessageEmbed();
		got('https://www.reddit.com/r/memes/random/.json')
			.then(response => {
				const [list] = JSON.parse(response.body);
				const [post] = list.data.children;

				const permalink = post.data.permalink;
				const memeUrl = `https://reddit.com${permalink}`;
				const memeImage = post.data.url;
				const memeTitle = post.data.title;
				const memeUpvotes = post.data.ups;
				const memeNumComments = post.data.num_comments;

				embed.setTitle(`${memeTitle}`);
				embed.setURL(`${memeUrl}`);
				embed.setColor('RANDOM');
				embed.setImage(memeImage);
				embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

				const row = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setLabel('Meme Link')
							.setStyle('LINK')
							.setURL(memeUrl)
					)

				interaction.editReply({ embeds: [embed], components: [row] });
			})
			.catch(console.error);
	},
};
