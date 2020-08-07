import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      notesList: {}
    }
  }

  async componentDidMount() {
    const response = await axios.get('https://donkey-bird.surge.sh/notes.json');
    const notesList = response.data;
    this.setState({ notesList: notesList }, () => {

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
      </div>
    );
  }
}

export default App;
