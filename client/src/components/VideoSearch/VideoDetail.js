import React from 'react';

const VideoDetail = props => {
  console.log(props);
  if (!props.selectedVideo) {
    return <div>Loading...</div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${props.selectedVideo.id.videoId}`;

  return (
    <div className='videoDisplay'>
      <div className='ui embed'>
        <iframe title='video player' src={videoSrc} />
      </div>
      <div className='ui segment'>
        <h4 className='ui header'>{props.selectedVideo.snippet.description}</h4>
      </div>
    </div>
  );
};

export default VideoDetail;
