const mysql = require("mysql");
//const dbConfig = require("../config/db.config.js");

const connection = mysql.createPool({
      host : '47.252.83.229',
      user : 'yihao',
      port:'3306',
      password : '960404',
      database : 'kanban',
    }
    ,(err)=>{
      if(err){
        console.log("Connection Error!")
      }
      else{
        console.log("Connection Success!")
      }
    }
);

module.exports = connection;
