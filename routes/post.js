const express = require('express');
const router = express.Router();
const db = require('../models');

const ctrls = require('../controllers');
const authRequired = require('../middleware/authRequired');


router.get( '/', authRequired, ctrls.post.index );
router.get('/addpost', authRequired, ctrls.post.addPostForm );
router.post('/newpost', ctrls.post.newPost );
//presentational for editing post
router.get( '/posts/:postId/edit', ( req, res) => {
    const id = req.params.postId;
  
    const foundPost = db.Post.findById( id )
  
    const context = {
      post: foundPost
    }
    console.log(context);
    res.render( 'post/edit', context )
});

//functional for editing post
router.put( '/posts/:postId/edit', ( req, res ) => {
    const id = req.params.postId;
  
    db.Post.findByIdAndUpdate( id, req.body );
  
    res.redirect('/')
  });

module.exports = router;
