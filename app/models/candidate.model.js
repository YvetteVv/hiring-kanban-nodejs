const sql = require("./db.js");

// constructor
const Candidate = function(candidate) {
  this.contact = candidate.contact;
  this.name = candidate.name;
  this.education = candidate.education;
  this.attach = candidate.attach;
  this.status = candidate.status;


};

Candidate.create = (newCand, result) => {
  sql.query("INSERT INTO candidate SET ?", newCand, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created candidate: ", { id: res.insertId, ...newCand });
    result(null, { id: res.insertId, ...newCand });
  });
};

Candidate.findById = (candidateId, result) => {
  sql.query(`SELECT * FROM candidate WHERE id = ${candidateId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found candidate: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found candidate with the id
    result({ kind: "not_found" }, null);
  });
};

Candidate.getAll = result => {
  sql.query("SELECT * FROM candidate", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("candidate: ", res);
    result(null, res);
  });
};

Candidate.updateById = (id, candidate, result) => {
  sql.query(
      "UPDATE candidate SET name = ?, education = ?, contact = ?, attach = ?, status = ? WHERE id = ?",
      [candidate.name, candidate.education, candidate.contact, candidate.attach, candidate.status, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found candidate with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated candidate: ", { id: id, ...candidate });
        result(null, { id: id, ...candidate });
      }
  );
};

// Candidate.updateUrlById = (id, url, result) => {
//   sql.query(
//       `UPDATE attach = ${url} WHERE id = ${id}`,
//       (err, res) => {
//         if (err) {
//           console.log("error: ", err);
//           result(null, err);
//           return;
//         }
//
//         if (res.affectedRows == 0) {
//           // not found candidate with the id
//           result({ kind: "not_found" }, null);
//           return;
//         }
//
//         console.log("updated candidate: ", { id: id, ...candidate });
//         result(null, { id: id, ...candidate });
//       }
//   );
// };

Candidate.remove = (id, result) => {
  sql.query(
      `DELETE FROM candidate WHERE id = ${id}; 
       UPDATE comment SET is_delete = ${1} WHERE cand_id = ${id}; 
       UPDATE score SET is_delete = ${1} WHERE cand_id = ${id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found candidate with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("deleted candidate with id: ", id);
        result(null, res);
      });
};


Candidate.removeAll = result => {
  sql.query("DELETE FROM candidate", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} candidate`);
    result(null, res);
  });
};

module.exports = Candidate;
