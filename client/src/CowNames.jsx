import React from 'react';

const CowNames = (props) => {
  return (
    <ol>
      {props.cows.map((cow, i) => {
        return <li key={i}>{cow.name}</li>;
      })}
    </ol>
  );
};

export default CowNames;
