const Score = require("../models/score.model.js");

// Create and Save a new Score
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Score
  const score = new Score({
    cand_id: req.param.candidateId,
    score: req.body.score,
  });

  // Save Score in the database
  Score.create(score, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Score."
      });
    else res.send(data);
  });
};


// Find a single Score with a condId
exports.findAveScore = (req, res) => {
  Score.findAveScore(req.params.candidateId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(200).send({
              CountAverage: -1
            }
          // message: `Not found Ave Score with id ${req.params.candidateId}.`
        );
      } else {
        res.status(500).send({
              CountAverage: -1
            }
          // message: "Error retrieving avg score with id " + req.params.candidateId
        )
      }
    } else res.send(data);
  });
};



// Delete all Scores from the database.
exports.deleteAll = (req, res) => {
  Score.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all scores."
      });
    else res.send({ message: `All scores were deleted successfully!` });
  });
};
