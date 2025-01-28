const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongodb = require('./mongodb/connect');

const port = 8080

app 
    .use(bodyParser.json())
    .use(express.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        next();
    })
    .use('/', require('./routes/contacts'));
    

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.error(err);
        }else{
            app.listen(process.env.PORT || port, () => {
            console.log('Web Server is listening on port ' + port);
            })
        }
    });
