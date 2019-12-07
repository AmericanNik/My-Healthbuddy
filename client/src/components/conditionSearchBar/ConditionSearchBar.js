import React, { Component } from "react";

export class ConditionSearchBar extends Component {
  constructor() {
    super();
    this.timer = null;

    this.state = {
      conditionSearchTerm: ""
    };
  }

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
    clearTimeout(this.timer);
    this.setState({ conditionSearchTerm: event.target.value });

    this.timer = setTimeout(() => {
      console.log("search!");
    }, 500);
  };

  onFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            value={this.state.conditionSearchTerm}
            onChange={this.onInputChange}
          />
        </form>
      </div>
    );
  }
}

export default ConditionSearchBar;
