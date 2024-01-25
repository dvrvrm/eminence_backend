const mongoAtlasUri = "mongodb+srv://eminence:eminence@cluster0.apliqvu.mongodb.net/?retryWrites=true&w=majority";

const redisCreds = {
    password: 'gL93mzHF4aNubrH78cDZvJJzU6jsEhnf',
    socket: {
        host: 'redis-12732.c274.us-east-1-3.ec2.cloud.redislabs.com',
        port: 12732
    }
};

const JWT_SECRET = 'supersecret';

module.exports = {
    mongoAtlasUri,
    redisCreds,
    JWT_SECRET
}