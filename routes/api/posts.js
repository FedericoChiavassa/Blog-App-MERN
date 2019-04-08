const express = require('express');
const router = express.Router();
const { unlink } = require('fs');
const auth = require('../../middleware/auth');
const imgUpload = require('../../middleware/imgUpload');

// Post Model
const Post = require('../../models/Post');

// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .populate('author', 'name')
        .sort({created_at: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404));
});

// @route   GET api/posts/page:id
// @desc    Get Posts per page
// @access  Public
router.get('/page:id', (req, res) => {
    Post.paginate({}, { 
            populate: {path: 'author', select: 'name'},
            sort:{created_at: -1}, 
            page: req.params.id, 
            limit: 4
        })   
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
router.post('/', auth, imgUpload.single('image'), (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        image: req.file ? req.file.path : "public/images/noimage.jpg",
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
router.put('/:id', auth, imgUpload.single('image'), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if(req.user.id == post.author) {
                if(req.file) {
                    // A) If there is a new image
                    req.body.image = req.file.path;           
                    if(post.image !== "public/images/noimage.jpg") {
                        // Delete old image if there is one
                        unlink(post.image, () => {
                            Post.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
                            .then(post => res.json(post))
                        })
                    } else {
                        // Don't delete old image if there wasn't
                        Post.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
                        .then(post => res.json(post))
                    } 
                }  else {
                    // B) If there is NOT a new image
                    Post.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
                    .then(post => res.json(post))
                }        
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
                if(post.image !== "public/images/noimage.jpg") {
                    // Delete image if there is one
                    unlink(post.image, () => {
                        post.remove().then(() => res.json({success: true}))
                    })
                } else {
                    post.remove().then(() => res.json({success: true})) 
                }
            }
            else {
                res.status(401).json({success: false});
            }
        })
        .catch(err => res.status(404).json({success: false}));
});


module.exports = router;