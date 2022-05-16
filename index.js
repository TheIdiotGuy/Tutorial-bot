const { Collection } = require("discord.js");
const client = require("./utils/client");
const Handler = require("./modules/Handler");
const _Handler = new Handler(client);
const keepAlive = require("./keepAlive");
const Enmap = require("enmap");
const { DiscordTogether } = require("discord-together");
client.games = new DiscordTogether(client);
client.commands = new Collection();
client.prefix = new Collection();
client.aliases = new Collection();
client.settings = new Enmap({ name: "settings", dataDir: "./database/settings" });
module.exports._Handler = _Handler;
require("dotenv").config();

const MusicDirs = ["distube"];

MusicDirs.forEach(music => {

    const Api = require(`./utils/Distube/${music}`);
    Api(client)

})

if (process.env["token"]) {
    _Handler._init()
    keepAlive()
    client.login(process.env["token"])
} else {
    throw new ReferenceError(`Bot token not provided.`)
}