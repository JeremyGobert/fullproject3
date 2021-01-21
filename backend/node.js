'use strict';

const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    let routes = [];
    app._router.stack.forEach(element => {
        console.log(element);
        if (element.name === "bound dispatch") {
            routes.push(element.route.path);
        }
    });
    res.send(routes);
});

app.post('/save', (req, res) => {
        const file = req.body;
        const img = file.inpFileVal;
    
        var data = img.replace(/^data:image\/\w+;base64,/, "");
        var buf = Buffer.from(data, 'base64');


        fs.writeFile('./test2.jpg', buf, (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log('file save successfully');
        });
        
        res.send(file.inpFileVal);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});