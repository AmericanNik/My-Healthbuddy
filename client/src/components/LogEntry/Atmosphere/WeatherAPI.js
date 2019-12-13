import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.darksky.net/forecast/9602ab6d200c5c4f85c2c9e82c8c5e5c'
});
