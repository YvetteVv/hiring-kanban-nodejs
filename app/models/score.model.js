const sql = require("./db.js");

// constructor
const Score = function(score) {
  this.cand_id = score.cand_id;
  this.score = score.score;
};

Score.create = (newScore, result) => {
  sql.query("INSERT INTO score SET ?", newScore, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created score: ", { id: res.insertId, ...newScore });
    result(null, { id: res.insertId, ...newScore });
  });
};

Score.findAveScore = (candidateId, result) => {
  sql.query(`SELECT AVG(score) AS CountAverage FROM score WHERE cand_id = ${candidateId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found score: ", res);
      result(null, res[0]);
      return;
    }

    // not found score with the id
    result({ kind: "not_found" }, null);
  });
};



module.exports = Score;
