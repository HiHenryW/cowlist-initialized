import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CowNames from './CowNames.jsx';
import AddCow from './InputForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cows: [],
    };
  }

  componentDidMount() {
    this.generateCows();
  }

  generateCows() {
    return axios
      .get('http://localhost:3000/cows')
      .then((res) => {
        this.setState({
          cows: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h4>Spotlight</h4>
        <h4>Cows Names</h4>
        <CowNames cows={this.state.cows} />
        <h4>Add New Cow</h4>
        <AddCow />
      </div>
    );
  }
}

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
