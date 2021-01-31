const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;
const apiURL = `http://localhost:${PORT}/api`;

export default apiURL;