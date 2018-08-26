const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

const dirToServe = __dirname + '/dist';

app.use(express.static(dirToServe));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(dirToServe, 'index.html'));
});

app.listen(port);
