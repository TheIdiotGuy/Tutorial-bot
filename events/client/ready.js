const client = require("../../utils/client")

/**
 * @param {client} client 
 */

module.exports = async (client) => {

    console.log(`ONLINE : ${client.user.tag}`);

    let status_1 = false;
    let status_2 = false;
    let version = "1.0.0";

    setInterval(() => {
        if (status_1) {
            client.user.setActivity(`Version : ${version}`, { type: "PLAYING" })
            status_1 = false
        } else if (status_2) {
            client.user.setActivity(`${client.guilds.cache.size} Guilds`, { type: "LISTENING" })
            status_2 = false
        } else {
            client.user.setActivity(`Scare`, { type: "WATCHING" })
            status_1 = true
            status_2 = true
        }
    }, 10000);

}