const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const BlogSchema = new Schema (
    {
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    state: {
        type: String, 
        default: 'draft', enum: ['draft', 'published']
    },
    read_count: {
        type: Number,
        default: 0
    },
    reading_time: {
        type: Number
    },
    tags: {
        type: [String]
    },
    body: {
        type: String,
        required: true
    },
    },
    { timestamps: true }
)

const BlogModel = mongoose.model('blogs', BlogSchema);

module.exports = BlogModel;