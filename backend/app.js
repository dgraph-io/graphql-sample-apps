var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const app = express()
const port = 4000

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var sign_s3 = require('./controllers/sign_s3');


// console.log(sign_s3.sign_s3)

app.use('/sign_s3', sign_s3.sign_s3);

app.listen(port);

console.log("Server Started make a request to localhost:" + port )
