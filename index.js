const { Collection } = require("discord.js");
const client = require("./utils/client");
require("dotenv").config();
client.commands = new Collection();
// client.slash = new Collection();
const Handler = require("./modules/Handler");
const keepAlive = require("./keepAlive");
const _Handler = new Handler(client);

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