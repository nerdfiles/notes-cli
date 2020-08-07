const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const CliCapture = require('../index.js');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/notes', (req, res) => {
  const notesList = fs.readFileSync('../cli/notes.json', {encoding: 'utf8', flag: 'r'});
  res.json(JSON.parse(notesList));
});

app.post('/notes', (req, res) => {

  const body = req.body;

  if (!body.command.includes('add')) {
    return res.status(400).json({
      status: 'failed to add content', 
      content: body.content
    });
  }

  const cliCapture = new CliCapture({
    notesPath: './notes.json',
    command: body.command,
    content: body.content
  });

  res.json({
    status: 'added from server'
  });

});

app.listen(9999, () => {

  console.log('listening on http://localhost:9999');
});
