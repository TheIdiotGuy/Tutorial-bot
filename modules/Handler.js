const { readdirSync } = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const rest = new REST({ version: "9" }).setToken(process.env["token"]);
const sleep = require("time-sleep");
const client = require("../utils/client");
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
        readdirSync("./commands/").forEach(dir => {
            const folder = readdirSync(`./commands/${dir}/`).filter(files => files.endsWith(".js"));
            for (let cmd of folder) {
                let pull = require(`../commands/${dir}/${cmd}`)
                this.client.commands.set(pull.name, pull);
                console.log(`[${'+'.magenta}] ${`Loaded command : ${pull.name}`.green}`)
            }
        })
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

        const eventDirs = ["client"];
        eventDirs.forEach(file => {
            loadEvents(file);
        });
    }

    async registerCommands() {
        const cmds = [];
        readdirSync("./commands/").forEach(dir => {
            const fold = readdirSync(`./commands/${dir}/`).filter(files => files.endsWith(".js"))
            for (let file of fold) {
                const command = require(`../commands/${dir}/${file}`)
                cmds.push(command)
            }
        })
        await rest.put(

            Routes.applicationGuildCommands(this.bot_id, this.test_server),
            { body: cmds },

            console.log(`[${'+'.magenta}] ${'Commands registered'.green}`)
        );
    }

    async _init() {
        console.log(`[${'SYSTEM'.red}] ${'Attempting to load command files.'.cyan}`);
        // await sleep(3000)
        this.handleCommands()

        console.log(`[${'SYSTEM'.red}] ${'Attempting to register slash commands'.cyan}`);
        // await sleep(3000)
        this.registerCommands();

        console.log(`[${'SYSTEM'.red}] ${'Attempting to load event files.'.cyan}`)
        // await sleep(3000)
        this.handleEvents()
    }
}

module.exports = Handler;