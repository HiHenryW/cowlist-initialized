import React from 'react';

class CowNames extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(cowDescription) {
    this.props.updateSpotlight(cowDescription);
  }

  render() {
    return (
      <ol>
        {this.props.cows.map((cow, i) => {
          // console.log(cow.description);
          return (
            <li key={i} onClick={this.handleClick.bind(this, cow.description)}>
              <a href="#">{cow.name}</a>
            </li>
          );
        })}
      </ol>
    );
  }
}

export default CowNames;
