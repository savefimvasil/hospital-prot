const express = require('express');
const postRoutes = express.Router();

let Post = require('./model.patient');

postRoutes.route('/add').post(function (req, res) {
  let post = new Post(req.body);
  post.save()
    .then((response) => {
      res.status(200).json({'business': response._id});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

postRoutes.route('/').get(function (req, res) {
    Post.find(function(err, posts){
    if(err){
      res.json(err);
    }
    else {
      res.json(posts);
    }
  });
});

postRoutes.route('/getUsersByDocId/:id').get(function (req, res) {
  Post.find(function(err, posts){
    if(err){
      res.json(err);
    }
    else {
      let postList = []
      for (let key in posts) {
        if (posts[key].doctor === req.params.id) {
          postList.push(posts[key])
        }
      }
      res.json(postList);
    }
  });
});

postRoutes.route('/findUser/:id').get(function (req, res) {
  let id = req.params.id;
  Post.find({email: id}, function (err, post){
      if(err) {
        res.json(err);
      }
      res.json(post);
  });
});

postRoutes.route('/update/:id').post(function (req, res) {
    Post.findById(req.params.id, function(err, post) {
    if (!post)
      res.status(404).send("data is not found");
    else {
      post.firstName = req.body.firstName
      post.secondName = req.body.secondName
      post.gender = req.body.gender
      post.birthDate = req.body.birthDate
      post.email = req.body.email
      post.phone = req.body.phone

      post.save().then(() => {
        res.json('Update complete');
      })
      .catch(() => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

postRoutes.route('/delete/:id').delete(function (req, res) {
    Post.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = postRoutes;
