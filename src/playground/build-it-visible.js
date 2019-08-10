const appRoot = document.getElementById('app');

let showDetails = false;

const toggleVisibility = () => {
  showDetails = !showDetails;
  render();
};

const render = () => {
  const template = (
    <div>
      <h1>Visibility Toggle</h1>
      <button onClick={toggleVisibility}>{showDetails ? 'Hide Details' : 'Show Details'}</button>
      {showDetails && <p>These are the details.</p>}
    </div>
  );

  ReactDOM.render(template, appRoot);
};

render();
