const { createClient } = require('redis');
const {redisCreds} = require("../config/credentials");

var client;
function intializeRedisClient() {
    try {
        client = createClient(redisCreds);
        (async () => { 
            await client.connect(); 
        })(); 
        client.on("ready", () => { 
            console.log("Redis : Connected!"); 
        });

        client.on("error", (err) => { 
            console.log("Redis : Error in the Connection"); 
        });        
    } catch (err) {
        console.log(error);
    }
}

function getRedisClient() {
    return client;
}

module.exports = {intializeRedisClient, getRedisClient};