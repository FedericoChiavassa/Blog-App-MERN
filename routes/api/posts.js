const express = require('express');
const router = express.Router();

// Post Model
const Post = require('../../models/Post');

// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
});

// @route   POST api/posts
// @desc    Create a Post
// @access  Public
router.post('/', (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        body: req.body.body
    });

    newPost.save().then(post => res.json(post));
});

// @route   GET api/posts/:id
// @desc    Get a Post
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post));
});

// @route   PUT api/posts/:id
// @desc    Update a Post
// @access  Public
router.put('/:id', (req, res) => {
    Post.findOneAndUpdate(
        {_id: req.params.id}, 
        req.body,
        {new: true}
    )
    .then(post => res.json(post))
});

// @route   DELETE api/posts/:id
// @desc    Delete a Post
// @access  Public
router.delete('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => post.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false,}));
});


module.exports = router;