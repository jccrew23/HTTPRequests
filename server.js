const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongodb = require('./mongodb/connect');

const port = 3000

app 
    .use(bodyParser.json())
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

    process.on('SIGINT', () => {
        mongodb.closeDb(); // Close MongoDB connection
        console.log('Server is shutting down...');
        process.exit(0);
    });