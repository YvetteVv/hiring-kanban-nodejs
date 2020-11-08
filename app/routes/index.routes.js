const sql = require("../models/db.js");
module.exports = app => {

  const multer  = require('multer');
  const AWS = require('aws-sdk');
  const fs=require('fs');
  const keys = require('./keys.js');


  const candidate = require("../controllers/candidate.controller.js");
  const comment = require("../controllers/comment.controller");
  const score = require("../controllers/score.controller");

  const storage = multer.diskStorage({
    destination : 'uploads/',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload = multer({ storage: storage });

//setting the credentials
//The region should be the region of the bucket that you created
//Visit this if you have any confusion - https://docs.aws.amazon.com/general/latest/gr/rande.html
  AWS.config.update({
    accessKeyId: keys.iam_access_id,
    secretAccessKey: keys.iam_secret,
    region: 'us-east-1',
  });

//Creating a new instance of S3:
  const s3= new AWS.S3();


  // Create a candidate
  app.post("/candidate", candidate.create);

  // Get all candidate
  app.get("/candidate", candidate.findAll);

  // Retrieve a single candidate with candidateId
  app.get("/candidate/:candidateId", candidate.findOne);

  // Update a candidate with candidateId
  app.put("/candidate/:candidateId", candidate.update);

  // Delete a candidate with candidateId
  app.delete("/candidate/:candidateId", candidate.delete);

  //app.delete("/candidate", candidate.deleteAll);

  // Create a comment
  app.put("/candidate/:candidateId/comment", comment.create);

  // Get all the comments by candidateId
  app.get("/candidate/:candidateId/comment", comment.findAllByCondId);

  app.put("/candidate/:candidateId/score", score.create);

  app.get("/candidate/:candidateId/average-score", score.findAveScore);

  //POST method route for uploading file
  app.post('/post_file/:candidateId', upload.single('demo_file'), function (req, res) {
    //Multer middleware adds file(in case of single file ) or files(multiple files) object to the request object.
    //req.file is the demo_file
    uploadFile(req.file.path, req.file.filename ,req.params.candidateId, res);
  })

//GET method route for downloading/retrieving file
  app.get('/get_file/:file_name',(req,res)=>{
    retrieveFile(req.params.file_name, res);
  });

  app.get('/get_fileUrl/:file_name',(req,res)=>{
    getFileUrl(req.params.file_name, res);
  });

//The uploadFile function
  function uploadFile(source, fileName, id, res){
    return new Promise((resolve, reject) => {
      fs.readFile(source, function (err, fileData) {
        if (err) {
          reject(err);
          return;
        }
        const md5FileName = fileName; // TODO
        const putParams = {
          Bucket      : 'yuweitest',
          Key         : md5FileName,
          Body        : fileData
        };
        const x = s3.putObject(putParams).promise();
        x.then(function(data) {
          console.log("Successfully uploaded data to " + putParams.Bucket + "/" + putParams.Key);
          resolve(`https://yuweitest.s3.amazonaws.com/${md5FileName}`);
        });
      })
    }).then((url) => {
        // TODO

        sql.query(
            `UPDATE candidate SET attach = ${url} WHERE id = ${id}`,
            (err, data) => {
                if (err) {
                    console.log("error: ", err);
                }
                else{
                    console.log("updated candidate: ", { id: id});
                    console.log(data);
                    res.send(data)
                }
            }
        );
        //res.send({url})
        return Promise.resolve();
    });
  }

//The retrieveFile function
  function retrieveFile(filename,res){

    const getParams = {
      Bucket: 'yuweitest',
      Key: filename
    };

    s3.getObject(getParams, function(err, data) {
      if (err){
        return res.status(400).send({success:false,err:err});
      }
      else{
        return res.send(data.Body);
      }
    });
  }

//getFileUrl function
  function getFileUrl(filename,res){
    const urlParams = {Bucket: 'yuweitest', Key: filename};
    s3.getSignedUrl('getObject', urlParams, function(err, url){
      if(err){
        return res.status(400).send({success:false ,'err':err});
      }
      else{
        return res.status(200).send({success:true ,'url':url});
      }
    });
  }


};
