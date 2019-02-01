const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Post = new Schema({
    title: String,
    body: {type: String, default: ''},
    createAt: {type: Date, default: Date.now},
    author: ObjectId,
    category: {type: Number, default: 1}
});

const PostModel = mongoose.model('Post', Post);

exports.PostModel = PostModel;