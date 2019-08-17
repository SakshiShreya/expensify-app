class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options
    };
    this.deleteOptions = this.deleteOptions.bind(this);
    this.onMakeDecision = this.onMakeDecision.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
  }

  componentDidMount() {
    try {
      const options = JSON.parse(localStorage.getItem('options'));

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // Do nothing at all
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length != this.state.options.length) {
      localStorage.setItem('options', JSON.stringify(this.state.options));
    }
  }

  deleteOptions() {
    this.setState(() => ({ options: [] }));
  }

  deleteOption(optionToRemove) {
    this.setState(prevState => ({ options: prevState.options.filter(option => option !== optionToRemove) }));
  }

  onMakeDecision() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  addOption(option) {
    if (!option) {
      return 'Enter a valid value';
    }
    if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }
    this.setState(prevState => ({ options: [...prevState.options, option] }));
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer.';

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action hasOptions={this.state.options.length > 0} onMakeDecision={this.onMakeDecision} />
        <Options options={this.state.options} deleteOptions={this.deleteOptions} deleteOption={this.deleteOption} />
        <AddOption addOption={this.addOption} />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecision'
};

const Action = props => {
  return (
    <div>
      <button onClick={props.onMakeDecision} disabled={!props.hasOptions}>
        What should I do?
      </button>
    </div>
  );
};

const Options = props => {
  return (
    <div>
      <button onClick={props.deleteOptions}>Remove All</button>
      {props.options.length === 0 && <p>Please add an option to get started</p>}
      {props.options.map(option => (
        <Option key={option} optionText={option} deleteOption={props.deleteOption} />
      ))}
    </div>
  );
};

const Option = props => {
  return (
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
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.addOption(option);
    if (!error) {
      e.target.elements.option.value = '';
    }

    this.setState(() => ({ error }));
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onFormSubmit}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
