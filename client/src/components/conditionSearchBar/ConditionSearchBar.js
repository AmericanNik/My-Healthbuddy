import React, { Component } from 'react';

export class ConditionSearchBar extends Component {
  state = {
    conditionSearchTerm: '',
    timeNumber: 0
  };

  debounce = (func, wait, immediate) => {
    var timeout;

    return function executedFunction() {
      var context = this;
      var args = arguments;

      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  };

  onInputChange = async event => {
    this.setState({ conditionSearchTerm: event.target.value });
    this.setState({ timeNumber: this.state.timeNumber + 1 });
    console.log('time number 1: ' + this.state.timeNumber);

    let returnedFunction = this.debounce(() => {
      console.log('searching!!!!');
    }, 500);
    window.addEventListener('resize', returnedFunction);

    // setTimeout(() => {
    //   this.setState({ timeNumber: 0 });
    // }, 2000);

    // setTimeout(() => {
    //   if (this.state.timeNumber != 0) {
    //     console.log('search');
    //   }
    // }, 250);

    // this.setState({ timeNumber: 0 });
    console.log('time Number 2: ' + this.state.timeNumber);
  };

  onFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input
            type='text'
            value={this.state.conditionSearchTerm}
            onChange={this.onInputChange}
          />
        </form>
      </div>
    );
  }
}

export default ConditionSearchBar;
