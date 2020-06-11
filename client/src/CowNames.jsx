import React from 'react';

const CowNames = (props) => (
  console.log('props passed to CowNames: ', props);
  let data = props.cows.map((cow) => {
    return <li>{cow.name}</li>;
  });
  return <ol>{data}</ol>;
);

export default CowNames;