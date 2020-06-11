import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
    axios
      .get('http://localhost:3000/cows')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return <div>Hello World!</div>;
  }
}

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
