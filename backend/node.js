'use strict';

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const {
    request,
    response
} = require('express');
const {
    WebhookClient
} = require('dialogflow-fulfillment');
const uuid = require('uuid');
const app = express();
const util = require('util');
const requesting = require('request');
const axios = require('axios');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({
    limit: '10mb'
}));

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

        } catch (err) {
            console.log(err.stack);
        } finally {
            res.redirect('https://fullproject3-site.herokuapp.com/');
        }
    }
    run().catch(console.dir);
});


app.post('/dialogflow', express.json(), (req, res) => {
    const agent = new WebhookClient({
        request: req,
        response: res
    });

    function welcome() {
        agent.add('Welcome to my agent!');
    }

    async function places(agent) {
        let location = agent.parameters["geo-city"];
        let lel = agent.parameters["geo-city"];
        var agentString = "";
        let lon = 0;
        let lat = 0;

        axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${location}&apikey=5ae2e3f221c38a28845f05b62d1ac562a2f1db0199e756e903a2a654`)
            .catch(function (error) {
                console.log(error);
                console.log('fuck');
            }).then(function (response) {
                let body = response.data;
                lon = body.lon;
                lat = body.lat;
                axios.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&limit=10&apikey=5ae2e3f221c38a28845f05b62d1ac562a2f1db0199e756e903a2a654`)
                    .catch(function (error) {
                        console.log(error);
                        console.log('fuck');
                    }).then(function (response) {
                        let body = response.data;
                        agentString = "Here is a list of some interesting places to vistit in " + location + ": ";
                        body.features.forEach(place => {
                            agentString += place.properties.name + ", \n";
                        });
                        console.log(agentString);
                        agent.add(agentString);
                    });
            });
    }


    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Place Intent', places);

    agent.handleRequest(intentMap);
});


app.post('/translate', (req, res) => {

    async function translation() {
        let origin = req.query.translate;
        let from = req.query.from;
        let to = req.query.to;

        const options2 = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'accept-encoding': 'application/gzip',
                'x-rapidapi-key': '2bc4ce673fmshc52b545e3b0cb23p114533jsn02827fd189e0',
                'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
                useQueryString: true
            },
            form: {
                q: origin,
                source: from,
                target: to
            }
        };
        var options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'accept-encoding': 'application/gzip',
                'x-rapidapi-key': '2bc4ce673fmshc52b545e3b0cb23p114533jsn02827fd189e0',
                'x-rapidapi-host': 'google-translate1.p.rapidapi.com'
            },
            data: {
                q: 'Hello, world!',
                source: 'en',
                target: 'es'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            let trans = JSON.parse(response.data);
            console.log(trans.data.translations[0].translatedText);
            res.send(trans.data.translations[0].translatedText);
        }).catch(function (error) {
            console.error(error);
        });

        /* requesting(options2, function (error, response, body) {
            if (error) throw new Error(error);
            let trans = JSON.parse(body);
            console.log(trans.data.translations[0].translatedText);
            res.send(trans.data.translations[0].translatedText);
        }); */

    }
    translation();
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


async function loadAllData(api) {
    const resp = await fetch(api);
    const data = await resp.json();
    return data;
}

function setHtmlData() {
    let link = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=belgium&inputtype=textquery&key=AIzaSyAyiPIrfJd1nzyZYu4myv4w-5ubdkxzjU0`;
    loadAllData(link);
}