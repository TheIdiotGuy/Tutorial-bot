/**
 * @param {require("../../utils/client")} client 
 */

module.exports = (client, id, replayedEvents) => {
    console.log(` || <==> || [${String(new Date).split(" ", 5).join(" ")}] || <==> || Shard #${id} Resumed || <==> ||`)
}
