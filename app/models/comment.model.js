const sql = require("./db.js");

// constructor
const Comment = function(comment) {
  this.cand_id = comment.cand_id;
  this.content = comment.content;
};

Comment.create = (newComment, result) => {
  sql.query("INSERT INTO comment SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created comment: ", { id: res.insertId, ...newComment });
    result(null, { id: res.insertId, ...newComment });
  });
};

Comment.findAllByCondId = (candidateId, result) => {
  sql.query(`SELECT * FROM comment WHERE cand_id = ${candidateId} AND is_delete = ${0}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found comment: ", res);
      result(null, res);
      return;
    }

    // not found comment with the id
    result({ kind: "not_found" }, null);
  });
};



module.exports = Comment;
