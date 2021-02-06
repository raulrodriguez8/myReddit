const db = require('../models');

// // presentational
// const addPostForm = ( req, res ) => {
//   res.render('post/new');
// }

const newComment = ( req, res ) => {
  const postId = req.session.currentPost.postId;
  console.log(req.body);

  db.Comment.create( req.body, ( err, createdComment ) => {
    if ( err ) return console.log(err)

    db.Post.findById( postId, ( err, foundPost ) => {

      createdComment.post = foundPost._id;
      createdComment.save();

      foundPost.comments.push(createdComment._id);
      foundPost.save();

      res.redirect('/');
    });
  });
}

const testPosts = ( req, res ) => {
  db.Post.find({})
  .then( posts => res.send(posts) )
  .catch( err => console.log(err) );
}


module.exports = {
  newComment,
}