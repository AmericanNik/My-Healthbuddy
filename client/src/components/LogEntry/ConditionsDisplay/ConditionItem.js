import React from 'react';
import './ConditionItem.css';

class ConditionItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      condition: this.props.condition,
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
    this.props.returnConditionStats(this.state.condition, e.target.value);
  };

  render() {
    return (
      <div key={this.props.condition} className='conditionItem'>
        <div className='conditionCardHead'>
          <div className='cardTitleHead'>
            <h1>{`${this.props.condition.charAt(0).toUpperCase() +
              this.props.condition.slice(1)}`}</h1>
            <h3>Rate your {this.props.condition}</h3>
            <br />
          </div>
          <div className='titleScore'>
            {`${this.props.condition.charAt(0).toUpperCase() +
              this.props.condition.slice(1)} Intensity Level: ${
              this.state.value
            }`}
          </div>
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

export default ConditionItem;
