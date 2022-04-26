const client = require("../client");
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

const distube = new DisTube(client, {
    searchSongs: 1,
    emitNewSongOnly: true,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: false,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    youtubeDL: false,
    updateYouTubeDL: false,
    nsfw: true,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ],
})

module.exports = distube;