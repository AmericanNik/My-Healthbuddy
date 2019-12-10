import React, { Component } from 'react';
import { Switch, Route, Link, HashRouter } from 'react-router-dom';
import youtube from './youtube';
import VideoDetail from './VideoDetail';
import VideoList from './VideoList';
import './VideoSearch.css';

export class VideoSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { videos: [], selectedVideo: null };

    this.onTermSubmit = async condition => {
      console.log('condition: ' + condition);
      const response = await youtube.get('/search', {
        params: {
          part: 'snippet',
          q: condition,
          key: 'AIzaSyBV0KIZpeNdrUP8tOzpRLtJ4VjINBm4EuY'
        }
      });

      this.setState({
        videos: response.data.items,
        selectedVideo: response.data.items[0]
      });
    };

    this.componentDidMount = () => {
      this.onTermSubmit(props.condition);
    };
  }

  onVideoSelect = video => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div className='videoSearchDisplay'>
        <div className='conditionHeader ui grid stackable'>
          <div className='eleven wide column'>
            <span>
              Selected Condition:{' '}
              <u>
                {this.props.condition.charAt(0).toUpperCase() +
                  this.props.condition.slice(1)}
              </u>
            </span>
          </div>
          <div className='five wide column'>
            <span
              className=' ui button fluid inverted clearButton'
              onClick={this.props.clearSearch}
            >
              Clear Results
            </span>
          </div>
        </div>
        <div className='ui grid stackable'>
          <div className='ui row'>
            <div className='eleven wide column'>
              <VideoDetail
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
                selectedVideo={this.state.selectedVideo}
              />
              <h2>
                {this.props.condition.charAt(0).toUpperCase() +
                  this.props.condition.slice(1)}{' '}
                Symptoms:
              </h2>
              {this.props.symptoms}
            </div>
            <div className='five wide column'>
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
        <Link to='/register'>
          <div class='ui animated fade button green huge fluid' tabindex='0'>
            <div class='visible content'>
              Track Your{' '}
              {this.props.condition.charAt(0).toUpperCase() +
                this.props.condition.slice(1)}
            </div>
            <div class='hidden content'>Join Healthbuddy Today For Free!</div>
          </div>
        </Link>
        <div className='clearButton2'>
          <button
            className='ui inverted button fluid '
            onClick={this.props.clearSearch}
          >
            Clear {this.props.condition} Results
          </button>
        </div>
      </div>
    );
  }
}

export default VideoSearch;
