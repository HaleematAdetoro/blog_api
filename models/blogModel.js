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
    state: {
        type: String,
        enum: ['draft', 'published'], 
        default: 'draft'
    },
    read_count: {
        type: Number
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
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const blogModel = mongoose.model("blogs", blogSchema);

module.exports = blogModel;