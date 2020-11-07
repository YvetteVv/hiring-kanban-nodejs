const Candidate = require("../models/candidate.model.js");

// Create and Save a new Candidate
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Candidate
  const candidate = new Candidate({

    name: req.body.name,
    education: req.body.education,
    email: req.body.email,
    attach: req.body.attach,
    status: req.body.status,

  });

  // Save Candidate in the database
  Candidate.create(candidate, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Candidate."
      });
    else res.send(data);
  });
};

// Retrieve all Candidates from the database.
exports.findAll = (req, res) => {
  Candidate.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving candidates."
      });
    else res.send(data);
  });
};

// Find a single Candidate with a candidateId
exports.findOne = (req, res) => {
  Candidate.findById(req.params.candidateId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Candidate with id ${req.params.candidateId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving candidate with id " + req.params.candidateId
        });
      }
    } else res.send(data);
  });
};

// Update a candidate identified by the candidateId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Candidate.updateById(
    req.params.candidateId,
    new Candidate(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Candidate with id ${req.params.candidateId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Candidate with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Candidate with the specified customerId in the request
exports.delete = (req, res) => {
  Candidate.remove(req.params.candidateId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Candidate with id ${req.params.candidateId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Candidate with id " + req.params.candidateId
        });
      }
    } else res.send({ message: `Candidate was deleted successfully!` });
  });
};

// Delete all Candidates from the database.
exports.deleteAll = (req, res) => {
  Candidate.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all candidates."
      });
    else res.send({ message: `All candidates were deleted successfully!` });
  });
};
