const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs')
const CliCapture = require('../index.js');

const app = express();


app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const baseUrl = 'http://localhost:9999'

app.get('/notes', (req, res) => {
  const rawNotesList = fs.readFileSync('../cli/notes.json', {encoding: 'utf8', flag: 'r'});
  const parsedNotesList = JSON.parse(rawNotesList);
  const links = [
    {
      rel: ["self"],
      href: [baseUrl, '/notes'].join('')
    }
  ];

  const actions = [
    {
      class: "add-note",
      href: [baseUrl, '/notes'].join(''),
      method: 'POST',
      fields: [
        {
          name: "command",
          type: "string"
        },
        {
          name: "content",
          type: "string"
        }
      ]
    }
  ];

  const responseWithControlData = {
    class: "note",
    ...parsedNotesList,
    links: links,
    actions: actions

  };

  res.json(responseWithControlData);
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
