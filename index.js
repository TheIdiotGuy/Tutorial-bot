const { Collection } = require("discord.js");
const client = require("./utils/client");
require("dotenv").config();
client.commands = new Collection();
const Handler = require("./modules/Handler");
const keepAlive = require("./keepAlive");
const _Handler = new Handler(client);

if (process.env["token"]) {
    _Handler._init()
    keepAlive()
    client.login(process.env["token"])
} else {
    throw new ReferenceError(`Bot token not provided.`)
}