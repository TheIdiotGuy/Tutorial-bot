const { MessageEmbed, MessageButton, MessageSelectMenu } = require('discord.js');
require(`colors`);
const distube = require("../../../utils/Distube/DistubeClient");

module.exports = {

    name: 'search',
    description: 'Search the song',
    timeout: 5000,
    category: 'Music',
    options: [
        {
            name: 'query',
            description: 'Search Query',
            type: 3,
            required: true,
        },
    ],

    run: async (client, interaction) => {

        const query = interaction.options.getString('query') || '';
        const { channel } = interaction.member.voice;

        await distube.voices.join(channel)

        const searchResult = await distube.search(query);
        const selecEmb = new MessageEmbed()
            .setTitle("Search Results")
            .setColor("BLUE")
            .setDescription("> **Select the track you want to play!**");

        let options = [];

        searchResult.forEach((song) => {
            let option = {
                label: `${song.name.length > 20 ? song.name.slice(0, 22) + "..." : song.name}`,
                description: `${song.uploader.name} • ${song.formattedDuration}`,
                value: song.url,
            }

            options.push(option);
        });


        let searched = new MessageSelectMenu()
            .setCustomId('search_select')
            .setPlaceholder('Choose a Song')
            .setMaxValues(1)
            .setMinValues(1)
            .addOptions(options)

        interaction.reply({
            embeds: [
                selecEmb
            ],
            components: [
                searched
            ]
        });

        client.on("clickMenu", async (menu) => {
            try {
                await menu.reply.defer();
                await client.distube.play(message, menu.values[0]);
                await menu.message.delete();
            } catch (err) {
                if (err) return;
            }
        });
    }
}