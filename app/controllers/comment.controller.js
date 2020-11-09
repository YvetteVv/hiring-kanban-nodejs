const Comment = require("../models/comment.model");

// Create and Save a new Comment
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Comment
  const comment = new Comment({
    cand_id: req.params.candidateId,
    content: req.body.content,
  });

  // Save Comment in the database
  Comment.create(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment."
      });
    else res.send(data);
  });
};


// Find a single Comment with a condId
exports.findAllByCondId = (req, res) => {
  Comment.findAllByCondId(req.params.candidateId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(200).send('[]'
          //message: `Not found Comment with id ${req.params.candidateId}.`
        );
      } else {
        res.status(500).send('[]'
          //message: "Error retrieving comment with id " + req.params.candidateId
        );
      }
    } else res.send(data);
  });
};



// Delete all Comments from the database.
exports.deleteAll = (req, res) => {
  Comment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all comments."
      });
    else res.send({ message: `All comments were deleted successfully!` });
  });
};
