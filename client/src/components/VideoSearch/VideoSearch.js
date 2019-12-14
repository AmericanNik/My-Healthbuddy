import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import youtube from './youtube';
import VideoDetail from './VideoDetail';
import VideoList from './VideoList';
import './VideoSearch.css';
import { throws } from 'assert';

export class VideoSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { videos: [], selectedVideo: null };

    this.onTermSubmit = async condition => {
      console.log('On Term Submitted!');

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

  conditionButtonClick = e => {
    this.props.videoSearchButtonClicked();
    this.props.clearSearch();
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
        <Link to={this.props.linkTo}>
          <div
            className='ui animated fade button green huge fluid'
            tabIndex='0'
            onClick={this.conditionButtonClick}
          >
            <div className='visible content'>
              {this.props.buttonIntro}{' '}
              {this.props.condition.charAt(0).toUpperCase() +
                this.props.condition.slice(1)}
            </div>
            <div className='hidden content'>{this.props.buttonOutro}</div>
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
