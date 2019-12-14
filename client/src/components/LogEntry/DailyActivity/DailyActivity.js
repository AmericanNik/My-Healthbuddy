import React, { Component } from 'react';
import './DailyActivity.css';

class DailyActivity extends React.Component {
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
    this.props.returnDailyAcivity(e.target.value);
  };

  render() {
    return (
      <div>
        <br />
        <div className='titleHead'>
          <h1>{`Activity Level: ${this.state.value}`}</h1>
          <h3>How would you rate your activity level today?(Be honest...)</h3>
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

export default DailyActivity;
