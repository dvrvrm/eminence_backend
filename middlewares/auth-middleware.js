const {getRedisClient} = require("../helpers/redis-connection");
const { validateJSONToken } = require('../util/auth');

// Middleware to check if the token is blacklisted using Redis
const isTokenValid = async  (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
      // token provided?
    if (token == null) {
        return res.status(401).send({
            message: "No token provided",
        });
    }

    const client = getRedisClient();
    // token in deny list?
    const inDenyList = await client.get(`bl_${token}`);
    if (inDenyList) {
        return response.status(401).send({
            message: "JWT Rejected",
        });
    }

     // is token valid?
     validateJSONToken(token, (error, user) => {
        if (error) {
            return res.status(401).send({
                status: "error",
                message: error.message
            });
        } else {
            req.userId = user.userId;
            req.tokenExp = user.exp;
            req.token = token;
            next();
        }
    });
  };

module.exports = {isTokenValid}