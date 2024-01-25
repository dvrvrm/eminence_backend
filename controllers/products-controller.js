
const axios = require('axios');

const getproducts = async (req, res, next) => {
    const apiUrl = "https://dummyjson.com/products";
    try {
        const response  = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
      next(error);
    }
}
  
module.exports = {
    getproducts
}
