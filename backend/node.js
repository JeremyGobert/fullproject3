'use strict';

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const {
    request,
    response
} = require('express');
const dialogflow = require('@google-cloud/dialogflow').v2beta1;
const uuid = require('uuid');
const app = express();
const util = require('util');
const requesting = require('request');
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


app.post('/dialogflow', (req, res) => {
    async function runSample(projectId = 'travelbot-pxus') {
        // A unique identifier for the given session
        const sessionId = uuid.v4();

        // Create a new session
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.projectAgentSessionPath(
            projectId,
            sessionId
        );

        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: 'hello',
                    // The language used by the client (en-US)
                    languageCode: 'en-US',
                },
            },
        };

        // Send request and log result
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = responses[0].queryResult;
        res.send(`  Response: ${result.fulfillmentText}`);
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
            console.log(`  Intent: ${result.intent.displayName}`);
        } else {
            console.log('  No intent matched.');
        }
    }
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.error(`
    USAGE:
        node quickstart.js <projectId>
    EXAMPLE:
        node quickstart.js my-project-id
    You can find your project ID in your Dialogflow agent settings:  https://dialogflow.com/docs/agents#settings.
    `);
        process.exit(1);
    }

    runSample(...args).catch(console.error);
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

        requesting(options2, function (error, response, body) {
            if (error) throw new Error(error);
            let trans = JSON.parse(body);
            console.log(trans.data.translations[0].translatedText);
            res.send(trans.data.translations[0].translatedText);
        });

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

