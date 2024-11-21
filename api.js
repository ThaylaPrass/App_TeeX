const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api-vendas-uhbp.onrender.com',
});

module.exports = api;