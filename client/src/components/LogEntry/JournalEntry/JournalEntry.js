import React, { Component } from 'react';
import './JournalEntry.css';

export class JournalEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journalEntry: ''
    };
  }

  handleChange = e => {
    this.setState({ journalEntry: e.target.value });
    this.props.returnJournalEntry(e.target.value);
  };
  render() {
    return (
      <div className="journalContainer'">
        <div>
          <div>
            {this.state.journalEntry !== '' ? (
              <div className='screenJournal'>
                <h4 className='journalHeader'> Dear HealthBuddy...</h4>
                <p className='journalEntry'>{this.state.journalEntry}</p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <div className='userJournalEntry'>
          <textarea
            className='ui input massive journalEntry'
            type='text'
            value={this.state.journalEntry}
            placeholder='Dear HealthBuddy, today was...'
            name='journalEntry'
            href='journalEntry'
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default JournalEntry;
