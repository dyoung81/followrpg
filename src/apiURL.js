const dotenv = require('dotenv');
dotenv.config();

const apiURL = process.env.apiURL || 'http://localhost:5000/api';

export default apiURL;