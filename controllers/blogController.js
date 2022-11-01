
const BlogModel = require('../models/blogModel');

const getAllUsersPosts = async (req, res) => {
    const posts = await BlogModel
    .select({ title: 1})
    .find({ state: 'published' })
    .populate('author', { username: 1 })

    return res.json({ status: true, data: posts })
};

const getAllPublishedPosts = (req, res) => {
    res.send(" Get all published posts")
}

const createNewPost = async (req, res) => {
    const { title, description, tags, body } = req.body;
    const readingTime = (post) => {
        const noOfWords = post.split(' ').length
        const wordsPerMinute = noOfWords/200
        return Math.round(wordsPerMinute) === 0?1: Math.round(math.round(wordsPerMinute))
    }

    const post = await BlogModel.create({
        title: body.title,
        description: body.description,
        author: req.user._id,
        reading_time: readingTime(body),
        tags: body.tags,
        body: body.body
    })

    const createdPost = await post.save()
    
    return res.status(201).json({
        status: true,
        data: createdPost,
    })
    
};

const updateOnePost = (req, res) => {
  res.send("Update one post")  
};

const deleteOnePost = (req, res) => {
    res.send("Delete one post")
}

module.exports = {
    getAllUsersPosts,
    getAllPublishedPosts,
    createNewPost,
    updateOnePost,
    deleteOnePost
}


