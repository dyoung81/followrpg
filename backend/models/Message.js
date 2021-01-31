const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgSchema = new Schema({
    name: {
        type: String,
        
    },
    content: {
        type: String,
        
    }
})
module.exports = mongoose.model('Message', msgSchema)