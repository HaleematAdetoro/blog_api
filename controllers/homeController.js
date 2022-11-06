const BlogModel = require('../models/blogModel');

const getAllPublishedBlogs = async (req, res) => {
    try {
        const { query } =req;

        const {
            author,
            title,
            tags,
            order = 'asc',
            order_by = 'read_time',
            per_page = 20
        } = query;

        const findQuery ={};

        if (author) {
            findQuery.author = author;
        }

        if (title) {
            findQuery.title = title;
        }

        if (tags) {
            findQuery.tags = tags;
        }
    
        const sortQuery = {};

        const sortAttributes = order_by.split(',')

        for (attribute of sortAttributes) {
            if (order === 'asc' && order_by) {
                sortQuery[attribute] = 1
            }
    
            if (order === 'desc' && order_by) {
                sortQuery[attribute] = -1
            }
        }

        const blogs = await BlogModel
            .find({ state: 'published'})
            .find(findQuery)
            .sort(sortQuery)
            .limit(per_page)

        return res.status(200).json({ status: true, blogs})
    } catch(error) {
        return(error)
    }
}


const getPublishedBlog = async (req, res) => {
    try {
        const  id  = req.params.id;
        const blog = await BlogModel.findById(id)
            .populate('author', { username: 1})
        

        if (!blog) {
            return res.status(404).json({ status: false, blog: null })
        }

        if (blog.state !== 'published') {
            return res.status(404).json({ status: false, blog: null })
        }
    
    
        blog.read_count += 1
        await blog.save()

        return res.json({ status: true, blog })
    } catch(error) {
        return(error)
    }
}


module.exports = {
    getAllPublishedBlogs,
    getPublishedBlog
}