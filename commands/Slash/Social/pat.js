const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {

	name: "pat",
	description: "Pat your loved one's",
	options: [
        {
            name: 'user',
            description: 'User to pat.',
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

            return interaction.reply({ content: ":x: i can't find this user" });

        }
        
        const fetchUser = await client.users.fetch(member);
        await fetchUser.fetch();

		if (!fetchUser) return interaction.reply({ content: `You need to mention someone to Pat!`, ephemeral: true });

		const { body } = await superagent
			.get("https://nekos.life/api/pat");

		const pat = new Discord.MessageEmbed()
			.setTitle(`${interaction.user.username} Pats ${fetchUser.username}`)
			.setImage(body.url)
			.setColor("#5440cd")

		interaction.reply({ embeds: [pat] })

	}
}