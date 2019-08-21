import React from 'react';

import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };

  deleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  deleteOption = optionToRemove => {
    this.setState(prevState => ({ options: prevState.options.filter(option => option !== optionToRemove) }));
  };

  onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({ selectedOption: option }));
  };

  addOption = option => {
    if (!option) {
      return 'Enter a valid value';
    }
    if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }
    this.setState(prevState => ({ options: [...prevState.options, option] }));
  };

  clearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };

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

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.options.length != this.state.options.length) {
      localStorage.setItem('options', JSON.stringify(this.state.options));
    }
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer.';

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action hasOptions={this.state.options.length > 0} onMakeDecision={this.onMakeDecision} />
        <Options options={this.state.options} deleteOptions={this.deleteOptions} deleteOption={this.deleteOption} />
        <AddOption addOption={this.addOption} />
        <OptionModal selectedOption={this.state.selectedOption} closeModal={this.clearSelectedOption} />
      </div>
    );
  }
}
