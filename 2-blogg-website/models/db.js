const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://user1:!234qweR@cluster0.rmrmn.mongodb.net/fbw3lei?retryWrites=true&w=majority';

// create comments schema to set the data structure that should be save on database 
// each scema must be connected with one collection on database
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

// function to connect to database
function connect() {
    return new Promise((resolve, reject) => {
        if(mongoose.connection.readyState === 1) {
            resolve();
        } else {
            mongoose.connect(connectionString, {
                useUnifiedTopology: true,
                useCreateIndex: true,
                useNewUrlParser: true
            }).then(() =>{
                resolve()
            }).catch(error => {
                reject(error)
            })
        }
    })
}

/**
 * this function for adding a new comment to database
 * @param {String} name 
 * @param {String} email 
 * @param {String} comment 
 * @param {Date} commentDate 
 */
function addComment(name, email, comment, commentDate) {
    return new Promise((resolve, reject) => {
        connect().then(() => {
            // create new comment instnce from Comment
            // using the parameters
            const newComment = new Comment({
                name, // name: name ''
                email,
                comment,
                commentDate
            });
            // save data to database
            newComment.save().then(result => {
                console.log(result);
                resolve()
            }).catch(error => {
                reject(error)
            })
        }).catch(error => {
            reject(error)
        })
    })
}
// export addComment to be used outside
module.exports = {
    addComment
}

