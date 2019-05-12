const express = require('express');
const postRoutes = express.Router();

let Post = require('./model.diseases');

postRoutes.route('/add').post(function (req, res) {
  let post = new Post(req.body);
  post.save()
    .then(() => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

postRoutes.route('/:id').get(function (req, res) {
  Post.find(function(err, posts){
    if(err){
      res.json(err);
    }
    else {
      let postList = []
      for (let post in posts) {
        if (posts[post].userId  === req.params.id) {
          postList.push(posts[post])
        }
      }
      res.json(postList);
    }
  });
});



postRoutes.route('/findById/:id').get(function (req, res) {
  let id = req.params.id;
  Post.findById(id, function (err, post){
    if(err) {
      res.json(err);
    }
    res.json(post);
  });
});


postRoutes.route('/delete/:id').delete(function (req, res) {
  Post.findByIdAndRemove({_id: req.params.id}, function(err){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = postRoutes;
