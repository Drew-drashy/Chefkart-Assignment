const express = require('express');
const { User} = require('../Models/userModel'); // Import User and Post models
const {Post} =require('../Models/postModel');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all posts of a user
router.get('/:userId/posts', async (req, res) => {
    const { userId } = req.params;
    try {
        const posts = await Post.findAll({ where: { userId:userId } });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a post for a user
router.post('/:userId/posts', async (req, res) => {
    const { userId } = req.params;
    const { title, description, images } = req.body;
    try {
        const post = await Post.create({ userId, title, description, images });
        // Increment post count for the user
        await User.increment('post_count', { by: 1, where: { id: userId } });
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit a post of a user
router.put('/:userId/posts/:postId', async (req, res) => {
    const { userId, postId } = req.params;
    const { title, description, images } = req.body;
    try {
        const post = await Post.findOne({ where: { id: postId, userId } });
        if (!post) return res.status(404).json({ error: "Post not found" });
        post.title = title || post.title;
        post.description = description || post.description;
        post.images = images || post.images;
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a post of a user
router.delete('/:userId/posts/:postId', async (req, res) => {
    const { userId, postId } = req.params;
    try {
        const post = await Post.findOne({ where: { id: postId, userId } });
        if (!post) return res.status(404).json({ error: "Post not found" });
        await post.destroy();
        // Decrement post count for the user
        await User.decrement('post_count', { by: 1, where: { id: userId } });
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
