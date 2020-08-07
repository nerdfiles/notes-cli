import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor() {
    super()

    this.baseUrl = 'https://donkey-bird.surge.sh/notes.json';
    this.localUrl = 'http://localhost:9999';

    this.state = {
      notesList: {},
      notes: {},
      content: ''
    }
  }

  extractData(data) {
    this.setState({notes: {
      class: data.class,
      links: data.links,
      actions: data.actions
    }}, () => {
      console.log('extract hateoas materials')
    });
    delete data.class;
    delete data.links;
    delete data.actions;
    return data;
  }

  updateInput(e) {
    this.setState({content: e.target.value})
  }

  async add(e) {
    e.preventDefault()
    const method = e.target.getAttribute('method').toLowerCase();

    const response = await axios[method](e.target.href, {
      command: 'add',
      content: this.state.content
    });

    const configData = JSON.parse(response.config.data)
    alert(`added note "${configData.content}"`);

    // @TODO pull down the new list and componentDidUpdate?

  }

  async componentDidMount() {
    //const response = await axios.get(this.baseUrl);
    const response = await axios.get([this.localUrl, '/notes'].join(''));
    const data = this.extractData(response.data);

    const notesList = data;
    this.setState({ notesList: notesList }, () => {
      console.log('Loaded notes from ' + this.baseUrl)
      console.log('HATEOAS stuffs')
      console.log(this.state.notes.actions)

    });
  }

  render() {
    return (
      <div className="App">
        <h1>Notes</h1>
        <ul>
        {
          Object.keys(this.state.notesList).map((key) => {
            return (
              <li key={key}>{key} {this.state.notesList[key]}</li>
            );
          })
        }
        </ul>

        <div>

          <input onChange={(e) => this.updateInput(e)} name="content" id="content" value={this.state.content} />
        </div>

        <ul>
        {
          this.state.notes.actions 
            ? (
                <li>
                  <a 
                    href={this.state.notes.actions[0].href}
                    method={this.state.notes.actions[0].method}
                    onClick={(e) => this.add(e)}
                  >Add</a>
                </li>
              )
            : null
        }
        </ul>
      </div>
    );
  }
}

export default App;
