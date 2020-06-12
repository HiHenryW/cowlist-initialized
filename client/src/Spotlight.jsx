import React from 'react';

const Spotlight = (props) => {
  if(props.spotlight) {
    return (
      <div>
        <p>{props.description}</p>
      </div>
    )
  } else {
    return null;
  }
};

export default Spotlight;
