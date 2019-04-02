const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Post Model
const Post = require('../../models/Post');

// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({created_at: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404));
});

// @route   GET api/posts/user/:id
// @desc    Get User Posts
// @access  Public
router.get('/user/:id', (req, res) => {
    Post.find({ author: req.params.id })
        .sort({created_at: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404));
});

// @route   POST api/posts
// @desc    Create a Post
// @access  Private
router.post('/', auth, (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        author: req.user.id
    });

    newPost.save().then(post => res.json(post));
});

// @route   GET api/posts/:id
// @desc    Get Post Details
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .populate('author', '-password')
        .then(post => res.json(post));
});

// @route   PUT api/posts/:id
// @desc    Update a Post
// @access  Private
router.put('/:id', auth, (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if(req.user.id == post.author) {
                Post.findOneAndUpdate(
                    {_id: req.params.id}, 
                    req.body,
                    {new: true}
                )
                .then(post => res.json(post))
            } else {
                res.status(401).json({msg: 'Invalid user' });
            }
        })
        .catch(err => res.status(404));
});

// @route   DELETE api/posts/:id
// @desc    Delete a Post
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if(req.user.id == post.author) {
               post.remove().then(() => res.json({success: true})) 
            }
            else {
                res.status(401).json({success: false});
            }
        })
        .catch(err => res.status(404).json({success: false}));
});


module.exports = router;