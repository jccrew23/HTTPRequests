const express = require('express');
const app = express();

app.use('/', require('./routes/mainRoute'))


const port = 3000

app.listen(process.env.PORT || port, () => {
    console.log('Web Server is listening on port ' + port);
});