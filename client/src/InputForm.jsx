import React from 'react';

class AddCow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
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

  render() {
    return (
      <form>
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
