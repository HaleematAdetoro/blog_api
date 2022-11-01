const mongoose = require('mongoose');

const Schema = mongoose.Schema();


const blogSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    author: {
        type: String,
        required: true
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
    timestamp: true,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const blogModel = mongoose.model("blogs", blogSchema);

module.exports = blogModel;