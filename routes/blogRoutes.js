const express = require('express');

const blogRouter = express.Router();

blogRouter.get('/', (req, res) => {
    res.json({ message: "Get all Published blogs"})
});

blogRouter.post("/", (req,res) => {
    res.json({ message: "created new blog"})
});

blogRouter.patch("/:blogId", (req, res) => {
    res.send("update an existing blog");
})

blogRouter.delete("/:blogId", (req, res) => {
    res.send("delete an existing workout");
})