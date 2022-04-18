const { readdirSync } = require("fs");
const client = require("./utils/client");
require("dotenv").config();

// event handler

const loadEvents = (folder) => {
    const dir = readdirSync(`./events/${folder}/`).filter(file => file.endsWith(".js"));
    for (let cmd of dir) {
        const event = require(`./events/${folder}/${cmd}`)
        const eventName = cmd.split(".")[0]
        client.on(eventName, event.bind(null, client))
        console.log(`File loaded : ${eventName}`);
    }
}

const eventDirs = ["client"];
eventDirs.forEach(file => {
    loadEvents(file);
});

client.login(process.env["token"]).then(() => {
    console.log("Token Login successful");
})