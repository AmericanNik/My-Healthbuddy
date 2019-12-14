import React, { Component } from 'react';
import ConditionItem from './ConditionItem';

class ConditionsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayConditions: []
    };
  }

  listItems = () => {
    this.props.conditions.map(condition => {
      return <li>{condition}</li>;
    });
  };

  render() {
    const { conditions, returnConditionStats } = this.props;
    const Condition = conditions.map(condition => (
      <ConditionItem
        className='child-list-item'
        as='a'
        key={condition}
        condition={condition}
        returnConditionStats={returnConditionStats}
      />
    ));

    return (
      <div className='children-container'>
        <div size={'massive'}>{Condition}</div>
      </div>
    );
  }
}

export default ConditionsDisplay;
