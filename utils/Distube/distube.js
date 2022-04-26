const { MessageEmbed } = require("discord.js");
const distube = require("./DistubeClient");

module.exports = async (client) => {

    const status = (queue) => {
        `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
    }

    distube

        .on('playSong', (queue, song) =>

            queue.textChannel?.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle(`Currently Playing!`)
                        .setDescription([
                            `> \`[${song.name}](${song.url})\``,
                            `> **Duration :** \`${queue.formattedCurrentTime}/${song.formattedDuration}\``,
                            `> **Requested By :** ${song.user}`
                        ].join("\n"))
                        .setColor("YELLOW")
                        .setThumbnail(song.thumbnail)
                        .setImage(song.thumbnail)
                ]
            }),
        )
        .on('addSong', (queue, song) =>
            queue.textChannel?.send(
                `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
            ),
        )
        .on('addList', (queue, playlist) =>
            queue.textChannel?.send(
                `Added \`${playlist.name}\` playlist (${playlist.songs.length
                } songs) to queue\n${status(queue)}`,
            ),
        )
        .on('error', (textChannel, e) => {
            console.error(e)
            textChannel.send(
                `An error encountered: ${e.message.slice(0, 1978)}`,
            )
        })
        .on('finish', queue => queue.textChannel?.send('Finish queue!'))
        .on('finishSong', queue =>
            queue.textChannel?.send('Finish song!'),
        )
        .on('disconnect', queue =>
            queue.textChannel?.send('Disconnected!'),
        )
        .on('empty', queue =>
            queue.textChannel?.send(
                'The voice channel is empty! Leaving the voice channel...',
            ),
        )
        .on('searchResult', (message, result) => {
            let i = 0
            message.channel.send(
                `**Choose an option from below**\n${result
                    .map(
                        song =>
                            `**${++i}**. ${song.name} - \`${song.formattedDuration
                            }\``,
                    )
                    .join(
                        '\n',
                    )}\n*Enter anything else or wait 30 seconds to cancel*`,
            )
        })
        .on('searchCancel', message =>
            message.channel.send('Searching canceled'),
        )
        .on('searchInvalidAnswer', message =>
            message.channel.send('Invalid number of result.'),
        )
        .on('searchNoResult', message =>
            message.channel.send('No result found!'),
        )
        .on('searchDone', () => { })

}