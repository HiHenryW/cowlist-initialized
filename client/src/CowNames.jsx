import React from 'react';

class CowNames extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(cowDescription) {
    this.props.updateSpotlight(cowDescription);
  }

  handleDelete(cowId) {
    this.props.deleteCow(cowId);
  }

  handleEdit(cowId) {
    const newDescription = prompt('Please enter new description for cow');
    this.props.editCow(cowId, newDescription);
  }

  render() {
    return (
      <ol>
        {this.props.cows.map((cow, i) => {
          // console.log(cow.description);
          return (
            <li key={i} onClick={this.handleClick.bind(this, cow.description)}>
              <a href="#">{cow.name}</a>
              <button onClick={this.handleEdit.bind(this, cow.id)}>
                Edit cow description
              </button>
              <button onClick={this.handleDelete.bind(this, cow.id)}>
                Delete cow
              </button>
            </li>
          );
        })}
      </ol>
    );
  }
}

export default CowNames;
