import React from 'react';

class AddCow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <form>
        <div>
          <label>
            Input Name
            <input type="text" placeholder="name of cow..."></input>
          </label>
        </div>
        <div>
          <label>
            Input Description
            <input type="text" placeholder="name of cow..."></input>
          </label>
        </div>
        <input type="submit" value="Add Cow" />
      </form>
    );
  }
}

export default AddCow;
