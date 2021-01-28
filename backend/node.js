'use strict';

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const { request, response } = require('express');
const { WebhookClient } = require('dialogflow-fulfillment');
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
    async function run() {
        try {
            const file = await req.body;
            const img = await file.inpFileVal;
    
            var data = await img.replace(/^data:image\/\w+;base64,/, "");
            var buf = Buffer.from(data, 'base64');

            const write = await fs.writeFile('./test2.jpg', buf);
        
        } catch(err){
            console.log(err.stack);
        } finally{
            res.redirect('https://fullproject3-site.herokuapp.com/');
        }
    }
    run().catch(console.dir);
});

app.post('/dialogflow-fulfilment', (req, res) => {
    dialogflowFulfilment(req, res);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const dialogflowFulfilment = (req, res) =>{
    const agent = new WebhookClient({req,res});

    function sayHello(agent){
        agent.add("this is from heroku");
    }

    let intentMap = new Map();
    intentMap.set("defoult intent", sayHello);
    agent.handleRequest(intentMap);
};

async function loadAllData(api) {
    const resp = await fetch(api);
    const data = await resp.json();
    return data;
}

function setHtmlData(){

    let link = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=belgium&inputtype=textquery&key=AIzaSyAyiPIrfJd1nzyZYu4myv4w-5ubdkxzjU0`;
    loadAllData(link);
}