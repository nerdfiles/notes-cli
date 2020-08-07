const fs = require('fs');

class CliCapture {
  constructor() {
    const argv = process.argv;
    this.command = argv[2];
    this.content = argv[3];

    if (this.command.includes('add') && this.content) {
      this.add();
    }

  }

  add() {
    const notesCli = new NotesCli();
    notesCli.addNote(this.content);
  }
}

class NotesCli {

  constructor() {
    this.notesPath = './notes.json';
    this.notesList = null;
  }

  /**
   * create
   *
   * @returns {undefined}
   */
  create() {

    return new Promise((res, rej) => {
      this.initNotes().then((resp) => {

        fs.readFile(this.notesPath, {encoding: 'utf8', flag: 'r'}, (err, file) => {
          this.notesList = file;
          res(resp);
        });

      });
    });

  }

  /**
   * initNotes
   *
   * @returns {undefined}
   */
  initNotes() {

    return new Promise((res, rej) => {
      fs.exists(this.notesPath, (ret) => {
        if (!ret) {
          fs.writeFileSync(this.notesPath, '{}', {});
        }
        res(ret);
      });
    });

  }

  /**
   * addNote
   *
   * @returns {undefined}
   */
  addNote(content) {

    this.create().then(() => {
      const j = JSON.parse(this.notesList);

      const d = new Date();
      const formattedDate = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
      j[formattedDate] = content;
      console.log(JSON.stringify(j));
      fs.writeFileSync(this.notesPath, JSON.stringify(j), {});
    })
  }

  /**
   * deleteNote
   *
   * @returns {undefined}
   */
  deleteNote() {
  }
}

const cliCapture = new CliCapture();


