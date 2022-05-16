const { readdirSync } = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require("dotenv").config();
const rest = new REST({ version: "9" }).setToken(process.env["token"]);
const sleep = require("time-sleep");
const client = require("../utils/client");
const { E } = require("../utils/error");
require("colors")

class Handler {

    /**
     * @param {client} client 
     */

    constructor(client) {
        this.client = client;
        this.bot_id = require("../config.json").bot_id;
        this.test_server = require("../config.json").test_server;
    }

    async handleCommands() {
        readdirSync("./commands/Slash/").forEach(dir => {
            const folder = readdirSync(`./commands/Slash/${dir}/`).filter(files => files.endsWith(".js"));
            for (let cmd of folder) {
                let pull = require(`../commands/Slash/${dir}/${cmd}`)
                this.client.commands.set(pull.name, pull);
                console.log(`[${"+".magenta}] ${`Slash command : ${pull.name}`.green}`)
            }
        });

        readdirSync("./commands/Prefix/").forEach(dir => {
            const folder = readdirSync(`./commands/Prefix/${dir}/`).filter(files => files.endsWith(".js"));
            for (let cmd of folder) {
                let pull = require(`../commands/Prefix/${dir}/${cmd}`)
                if (pull.name) {
                    this.client.prefix.set(pull.name, pull);
                    console.log(`[${"+".magenta}] ${`Prefix command : ${pull.name}`.green}`)
                } else {
                    console.log(`[${"-".magenta}] ${`Prefix command : ${pull.name}`.red}`)
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
            }
        });
    }

    async handleEvents() {
        const loadEvents = (folder) => {
            const dir = readdirSync(`./events/${folder}/`).filter(file => file.endsWith(".js"));
            for (let cmd of dir) {
                const event = require(`../events/${folder}/${cmd}`)
                const eventName = cmd.split(".")[0]
                this.client.on(eventName, event.bind(null, this.client));
                console.log(`[${'+'.magenta}] ${`File loaded : ${eventName}`.green}`);
            }
        }

        const eventDirs = ["client", "guild"];
        eventDirs.forEach(file => {
            loadEvents(file);
        });
    }

    async registerCommands() {
        let cmds = [];

        readdirSync("./commands/Slash/").forEach(dir => {
            const fold = readdirSync(`./commands/Slash/${dir}/`).filter(files => files.endsWith(".js"))
            for (let file of fold) {
                const command = require(`../commands/Slash/${dir}/${file}`)
                cmds.push(command)
            }
        })

        let config = require("../config.json");

        if (config.globalCmd) {
            await rest.put(

                Routes.applicationCommands(this.bot_id),
                { body: cmds },

                console.log(`[${'+'.magenta}] ${'Commands registered globally'.green}`)
            );
        } else {
            await rest.put(

                Routes.applicationGuildCommands(this.bot_id, this.test_server),
                { body: cmds },

                console.log(`[${'+'.magenta}] ${'Commands registered locally'.green}`)
            );
        }
    }

    async _init() {
        console.log(`[${'SYSTEM'.red}] ${'Attempting to load command files.'.cyan}`);
        this.handleCommands()

        console.log(`[${'SYSTEM'.red}] ${'Attempting to register slash commands'.cyan}`);
        this.registerCommands();

        console.log(`[${'SYSTEM'.red}] ${'Attempting to load event files.'.cyan}`)
        this.handleEvents()
    }
}

module.exports = Handler;