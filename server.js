const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./mongodb/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


const port = process.env.PORT || 8080;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contacts API',
            version: '1.0.0',
            description: 'A simple contacts API',
        },
        servers: [
            {
                url: 'http://localhost:8080',
                url: 'https://httprequests.onrender.com'
            },
        ],
    
    },
    apis: ['./routes/*.js'],
};

try {
    const specs = swaggerJsDoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
} catch (error) {
    console.error('Error generating Swagger specs:', error);
}

app 
    .use(cors())
    .use(bodyParser.json())
    .use(express.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        next();
    })
    .use('/', require('./routes/contacts'))
    .get('/favicon.ico', (req, res) => res.status(204).end())
;

    

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.error(err);
        }else{
            app.listen(port, () => {
            console.log('Web Server is listening on port ' + port);
            })
        }
    });
