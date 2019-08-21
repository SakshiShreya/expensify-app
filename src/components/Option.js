import React from 'react';

const Option = props => (
  <div>
    <div>{props.optionText}</div>
    <button
      onClick={e => {
        props.deleteOption(props.optionText);
      }}
    >
      Remove
    </button>
  </div>
);

export default Option;
