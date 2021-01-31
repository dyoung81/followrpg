const dotenv = require('dotenv');
dotenv.config();
var url = ''
if (process.env.NODE_ENV === 'production'){
    url = 'https://follow-rpg.herokuapp.com/api';
} else {
url = 'http://localhost:5000/api';
}
const apiURL = url;

export default apiURL;