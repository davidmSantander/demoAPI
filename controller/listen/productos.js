const bodyParser = require('body-parser');
const cors = require('cors');
let express = require('express');


const urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true});
let app = express();


app.get('/demo/productos', cors(), urlencodedParser, async (request, response) => {
    let data = {name:'galleta oreo',value:990}
    response.status(200).json(data);
});

module.exports = app;

