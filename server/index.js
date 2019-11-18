const express = require('express');

// cache menu data
const menu = require('./data/menu.json');

const app = express();

app.get('/api/menu', (req, res) => {
  setTimeout(() => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // simply return entire menu
    res.json(menu);
  }, 300);
});

app.listen(3001, () => {
  console.log('API server running on localhost:3001');
});
