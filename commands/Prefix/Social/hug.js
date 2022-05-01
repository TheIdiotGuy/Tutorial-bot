const Discord = require('discord.js');
const superagent = require('superagent');
const { E } = require('../../../utils/error');

module.exports = {

	name: "hug",
	description: "Hug your loved one's",
	options: [
        {
            name: 'user',
            description: 'User to hug.',
            type: 6,
        },
    ],
	category: "Social",

	/**
	 * 
	 * @param {Discord.CommandInteraction} interaction 
	 * @returns 
	 */

	async run(client, interaction) {

		const member = interaction.options.getMember('user');

		try {

            await client.users.fetch(member);

        } catch (e) {

			E.sendDev(interaction, e);
            return interaction.reply({ content: ":x: i can't find this user" });

        }
        
        const fetchUser = await client.users.fetch(member);
        await fetchUser.fetch();

		if (!fetchUser) return interaction.reply({ content: `You need to mention someone to Hug!`, ephemeral: true });

		const { body } = await superagent
			.get("https://nekos.life/api/hug");

		const hug = new Discord.MessageEmbed()
			.setTitle(`${interaction.user.username} Hugs ${fetchUser.username}`)
			.setImage(body.url)
			.setColor("#5440cd")

		interaction.reply({ embeds: [hug] })

	}
}