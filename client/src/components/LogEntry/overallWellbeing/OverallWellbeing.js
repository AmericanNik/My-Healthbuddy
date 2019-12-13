import React, { Component } from 'react';
import './overallWellbeing.css';

class RangeSlider extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 1
    };
    this.genSlideStyle = value => {
      return {
        point: {
          left: `calc(${value * 20}% - ${5 + 3 * value}px)`
        },
        range: {
          width: `${value * 20}%`
        }
      };
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
    this.props.returnOverallWellbeing(e.target.value);
  };

  render() {
    return (
      <div>
        <br />
        <div className='titleHead'>
          <h1>{`Todays Overall Wellbeing: ${this.state.value}`}</h1>
          <h3>How would you rate your overall wellbeing today?</h3>
          <br />
        </div>

        <div className='slideContainer'>
          <input
            className='range-slide'
            name='range'
            type='range'
            min='0'
            max='10'
            value={this.state.value}
            step='1'
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default RangeSlider;
