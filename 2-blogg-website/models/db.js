const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://user1:!234qweR@cluster0.rmrmn.mongodb.net/fbw3lei?retryWrites=true&w=majority';

// create comments schema
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    commentDate: {
        type: Date,
        required: true
    }
});

// connect commentSchema with the collection comments on database 
// we will get a module that we can use to interact with database
const Comment = mongoose.model('comments', commentSchema);