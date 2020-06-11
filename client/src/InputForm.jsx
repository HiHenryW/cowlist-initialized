import React from 'react';
import axios from 'axios';

class AddCow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // send POST request to server with name and description
    return (
      axios
        .post('/cows', {
          name: this.state.name,
          description: this.state.description,
        })
        // then reset state to empty strings
        .then(() => {
          this.setState({
            name: '',
            description: '',
          });
        })
        // then rerender cows in index.jsx
        .then(() => {
          this.props.onFormSubmission();
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Input Name
            <input
              type="text"
              placeholder="name of cow..."
              value={this.state.name}
              onChange={this.handleNameChange}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Input Description
            <input
              type="text"
              placeholder="description of cow..."
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            ></input>
          </label>
        </div>
        <input type="submit" value="Add Cow" />
      </form>
    );
  }
}

export default AddCow;
