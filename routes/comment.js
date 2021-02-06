const express = require('express');
const router = express.Router();

const ctrls = require('../controllers');
const authRequired = require('../middleware/authRequired');


// router.get( '/newcomment', authRequired, ctrls.post.index );
// router.get('/addcomment', authRequired, ctrls.comment.addCommentForm );
router.post('/newcomment', ctrls.comment.newComment );


module.exports = router;
