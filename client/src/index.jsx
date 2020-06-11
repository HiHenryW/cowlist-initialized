import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CowNames from './CowNames.jsx';

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
        <CowNames cows={this.props.cows} />
      </div>
    );
  }
}

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
