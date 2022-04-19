const { Collection } = require("discord.js");
const client = require("./utils/client");
require("dotenv").config();
client.commands = new Collection();
const Handler = require("./classes/Handler");
const _Handler = new Handler(client);

if (process.env["token"]) {
    _Handler._init()
} else {
    throw new Error(`Bot token not provided.`)
}

client.login(process.env["token"])