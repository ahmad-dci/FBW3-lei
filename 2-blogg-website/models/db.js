const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// create user Schema
const userSchema = new Schema({
    lName: {
        required: true,
        type: String
    },
    fName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
});

// userSchema.pre('update', function( next ) {
//     this.update({}, { $inc: { __v: 1 } }, next );
//   });
// create User mongoose model
const User = mongoose.model('users', userSchema);


// connect commentSchema with the collection comments on database 
// we will get a module that we can use to interact with database
const Comment = mongoose.model('comments', commentSchema);

// function to connect to database

/**
 * connect function used to make sure that the connection is opend with database
 */
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
                resolve();
            }).catch(error => {
                reject(error);
            })
        }).catch(error => {
            reject(error);
        })
    })
}

/**
 * get all comments from database
 */
function getComments() {
    return new Promise((resolve, reject) => {
        // first connect to data base
        connect().then(() => {
            Comment.find().then(comments => {
                resolve(comments);
        }).catch(error => {
            reject(error);
        })
        }).catch(error => {
            reject(error);
        })
        
    })
}

/**
 * save user data to database
 * @param {String} lname 
 * @param {String} fname 
 * @param {String} email 
 * @param {String} password 
 */
function registerUser (fname, lname, email, password){
    return new Promise((resolve, reject) => {
        connect().then(() => {

            // const bcrypt = require('bcrypt');
            bcrypt.hash(password, 10, (err, hashedPass) => {
                if (err){
                    reject(err);
                } else {
                    const newUser = new User({
                        lName: lname,
                        fName: fname,
                        email,
                        password: hashedPass
                    });
                    newUser.save().then((data) => {
                        resolve(data);
                    }).catch(error => {
                        reject(error);
                    })
                }
            })

            
        }).catch(error => {
            reject(error)
        })
    })
}


function checkUser(email, password) {
    // error 2: user is not exist
    // error 3: user entered wrong password
    return new Promise((resolve, reject) => {
        connect().then(() => {
            User.findOne({email}).then(data => {
                if(!data) {
                    reject(2);
                } else {
                    bcrypt.compare(password, data.password, (err, result) => {
                        if(result) {
                            resolve();
                        } else {
                            reject(3);
                        }
                    })
                }
            }).catch(error => {
                reject(error);
            })
        }).catch(error => {
            reject(error);
        })
    })
}

// export addComment,getComments  to be used outside
module.exports = {
    addComment,
    getComments,
    registerUser,
    checkUser
}

