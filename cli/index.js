const fs = require('fs');

class CliCapture {

  constructor(config) {

    const argv = process.argv;
    this.command = config.command || argv[2];
    this.content = config.content || argv[3];
    this.cli = new NotesCli(config);

    this.execute();
  }

  /**
   * execute
   *
   * @returns {undefined}
   */
  execute() {

    try {
      this.cli[this.command](this.content);
    } catch (e) {
      console.log('flunk');
    }
  }
}

class NotesCli {

  constructor(config) {
    this.notesPath = config.notesPath || './notes.json';
    this.notesList = null;
  }

  /**
   * create
   *
   * @returns {Promise}
   */
  create() {

    return new Promise((res, rej) => {
      this.init().then((resp) => {

        fs.readFile(this.notesPath, {encoding: 'utf8', flag: 'r'}, (err, file) => {
          this.notesList = file;
          res(resp);
        });

      });
    });

  }

  /**
   * init
   *
   * @returns {Promise}
   */
  init() {

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
   * add
   *
   * @returns {undefined}
   */
  add(content) {

    this.create().then(() => {
      const parsedNotesList = JSON.parse(this.notesList);

      const rawDate = new Date();
      const formattedDate = `${rawDate.toLocaleDateString()} ${rawDate.toLocaleTimeString()}`;
      parsedNotesList[formattedDate] = content;
      console.log(JSON.stringify(parsedNotesList));
      fs.writeFileSync(this.notesPath, JSON.stringify(parsedNotesList), {});
    });
  }

  /**
   * remove
   *
   * @returns {undefined}
   */
  remove() {
    console.log('pass');
  }
}


module.exports = CliCapture;

if (process.argv.length > 2) {
  // Run and capture cli
  const cliCapture = new CliCapture({
    notesPath: './notes.json'
  });
}


