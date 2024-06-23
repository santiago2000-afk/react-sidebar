import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://localhost:3000';
api.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
api.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization';

export default api;
