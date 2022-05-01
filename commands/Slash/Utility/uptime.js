const { MessageEmbed, MessageButton } = require('discord.js');
require(`colors`);

module.exports = {

    name: 'uptime',
    description: 'The Bot\'s Uptime',
    timeout: 5000,
    category: 'Utility',

    run: async (client, interaction) => {

        let humanRead = (num, intSep = ', ', floatSep = '.') => {

            return new Intl
                .NumberFormat('en-US')
                .format(num)
                .replaceAll('.', floatSep)
                .replaceAll(',', intSep);

        }


        function parseDuration(duration) {
            let remain = duration
            let days = Math.floor(remain / (1000 * 60 * 60 * 24))
            remain = remain % (1000 * 60 * 60 * 24)

            let hours = Math.floor(remain / (1000 * 60 * 60))
            remain = remain % (1000 * 60 * 60)

            let minutes = Math.floor(remain / (1000 * 60))
            remain = remain % (1000 * 60)

            let seconds = Math.floor(remain / (1000))
            remain = remain % (1000)

            let milliseconds = remain

            return {
                days,
                hours,
                minutes,
                seconds,
                milliseconds
            };
        }

        function formatTime(o, useMilli = false) {
            let parts = []
            if (o.days) {
                let ret = o.days + ' Day'
                if (o.days !== 1) {
                    ret += 's'
                }
                parts.push(ret)
            }
            if (o.hours) {
                let ret = o.hours + ' Hr'
                if (o.hours !== 1) {
                    ret += 's'
                }
                parts.push(ret)
            }
            if (o.minutes) {
                let ret = o.minutes + ' Min'
                if (o.minutes !== 1) {
                    ret += 's'
                }
                parts.push(ret)

            }
            if (o.seconds) {
                let ret = o.seconds + ' Sec'
                if (o.seconds !== 1) {
                    ret += 's'
                }
                parts.push(ret)
            }
            if (useMilli && o.milliseconds) {
                let ret = o.milliseconds + ' ms'
                parts.push(ret)
            }
            if (parts.length === 0) {
                return 'instantly'
            } else {
                return parts
            }
        }

        function duration(duration, useMilli = false) {
            let time = parseDuration(duration)
            return formatTime(time, useMilli)
        }

        await interaction.reply('🏓 Fetching...');
        const msg = await interaction.fetchReply();
        const embed = new MessageEmbed()
            .setTitle('{botname} | Uptime'.replace(/{botname}/i, "Ochako"))
            .setColor('BLURPLE')
            .setTimestamp()
            .setDescription([
                `\`\`\`fix`,
                `§ Uptime  : ${duration(client.uptime)}`,
                `\`\`\``
            ].join("\n"))
        // .setThumbnail()
        interaction.editReply({ embeds: [embed], content: `<@${interaction.user.id}>` });

    }
}