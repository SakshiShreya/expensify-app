class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    this.setState(prevState => ({ showDetails: !prevState.showDetails }));
  }

  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.toggleVisibility}>{this.state.showDetails ? 'Hide Details' : 'Show Details'}</button>
        {this.state.showDetails && <p>These are the details.</p>}
      </div>
    );
  }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));

// const appRoot = document.getElementById('app');

// let showDetails = false;

// const toggleVisibility = () => {
//   showDetails = !showDetails;
//   render();
// };

// const render = () => {
//   const template = (
//     <div>
//       <h1>Visibility Toggle</h1>
//       <button onClick={toggleVisibility}>{showDetails ? 'Hide Details' : 'Show Details'}</button>
//       {showDetails && <p>These are the details.</p>}
//     </div>
//   );

//   ReactDOM.render(template, appRoot);
// };

// render();
