import axios from 'axios';

const KEY = 'AIzaSyBV0KIZpeNdrUP8tOzpRLtJ4VjINBm4EuY';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: KEY
  }
});
