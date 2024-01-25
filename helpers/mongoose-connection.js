var mongoose = require("mongoose");
const {mongoAtlasUri} = require("../config/credentials");

function mongooseConnection(){
    try {
        // Connect to the MongoDB cluster
        mongoose.connect(
            mongoAtlasUri,
            { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
        console.log("could not connect");
    }
    const dbConnection = mongoose.connection;
    dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
    dbConnection.once("open", () => console.log("Connected to DB!"));
}
module.exports = mongooseConnection;