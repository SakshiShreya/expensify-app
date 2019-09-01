import React from 'react';

const EditExpensePage = props => {
  console.log(props);
  return <div>Editing an expense withan id of value {props.match.params.id}</div>;
};

export default EditExpensePage;
