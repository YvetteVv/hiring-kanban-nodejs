module.exports = app => {
  const candidate = require("../controllers/candidate.controller.js");
  const comment = require("../controllers/comment.controller");
  const score = require("../controllers/score.controller")


  //Create a candidate
  app.post("/candidate", candidate.create);

  app.get("/candidate", candidate.findAll);

  // Retrieve a single candidate with candidateId
  app.get("/candidate/:candidateId", candidate.findOne);

  // Update a candidate with candidateId
  app.put("/candidate/:candidateId", candidate.update);

  // Delete a candidate with candidateId
  app.delete("/candidate/:candidateId", candidate.delete);

  app.delete("/candidate", candidate.deleteAll);

  app.post("/comment", comment.create);

  app.get("/comment/:candidateId", comment.findAllByCondId);

  app.post("/score", score.create);

  app.get("/score/:candidateId", score.findAveScore);

};
