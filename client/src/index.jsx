import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CowNames from './CowNames.jsx';
import AddCow from './InputForm.jsx';
import Spotlight from './Spotlight.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cows: [],
      spotlight: false,
      showDescription: '',
    };
  }

  componentDidMount() {
    this.generateCows();
  }

  generateCows() {
    return axios
      .get('/cows')
      .then((res) => {
        this.setState({
          cows: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateSpotlight(description) {
    this.setState({
      spotlight: true,
      showDescription: description,
    });
  }

  deleteCow(cowId) {
    let url = `/cows/${cowId}`;
    return axios
      .delete(url)
      .then(() => {
        this.setState({
          spotlight: false,
          showDescription: '',
        });
      })
      .then(() => {
        this.generateCows();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editCow(cowId, newDescription) {
    let url = `/cows/${cowId}`;
    return axios
      .put(url, {
        description: newDescription,
      })
      .then(() => {
        this.setState({
          spotlight: false,
          showDescription: '',
        });
      })
      .then(() => {
        this.generateCows();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h4>Spotlight</h4>
        <Spotlight
          spotlight={this.state.spotlight}
          description={this.state.showDescription}
        />
        <h4>Cows Names</h4>
        <CowNames
          cows={this.state.cows}
          updateSpotlight={this.updateSpotlight.bind(this)}
          deleteCow={this.deleteCow.bind(this)}
          editCow={this.editCow.bind(this)}
        />
        <h4>Add New Cow</h4>
        <AddCow onFormSubmission={this.generateCows.bind(this)} />
      </div>
    );
  }
}

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
