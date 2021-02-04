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
/*     var agentString = "";
    let lon = 0;
    let lat = 0;
 */
    function welcome() {
        agent.add('Welcome to my agent!');
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


/*     async function follow2(agent) {
        console.log("yeet3");
        if (agentString.length !== null){
            agent.add(agentString);
        }else{
            await sleep(3000);
            agent.add("this is fucked");
        }
    }

    async function follow1(agent) {
        console.log("yeet2");
        if (agentString.length !== null){
            agent.add(agentString);
        }else{
            await sleep(3000);
            agent.setFollowupEvent("waittwo");
        }
    }

    async function follow(agent) {
        console.log("yeet1");
        if (agentString.length !== null){
            agent.add(agentString);
        }else{
            await sleep(3000);
            agent.setFollowupEvent("waitone");
        }
    } */

    function places(agent) {
        var agentString = "";
        let lon = 0;
        let lat = 0;
        let location = agent.parameters["geo-city"];
        let iets = agent.parameters["@map-sort"];
        agent.setFollowupEvent("waitone");
        console.log('wait');
        console.log(agentString);
        console.log('wait');
        axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${location}&apikey=5ae2e3f221c38a28845f05b62d1ac562a2f1db0199e756e903a2a654`)
            .then(function (response) {
                let body = response.data;
                lon = body.lon;
                lat = body.lat;
                console.log('latlon');
                axios.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&limit=5&apikey=5ae2e3f221c38a28845f05b62d1ac562a2f1db0199e756e903a2a654`)
                    .then(function (response) {
                        let body = response.data;
                        agentString = "Here is a list of some interesting places to vistit in " + location + ": ";
                        body.features.forEach(place => {
                            agentString += place.properties.name + ", \n";
                        });
                        agent.add(agentString);
                        console.log(agentString);
                    }).catch(function (error) {
                        console.log(error);
                        console.log('fuck');
                    });
            }).catch(function (error) {
                console.log(error);
                console.log('fuck');
            });
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Place Intent', places);
/*     intentMap.set('Default FollowUp Intent', follow);
    intentMap.set('Default FollowUp1 Intent', follow1);
    intentMap.set('Default FollowUp2 Intent', follow2); */
    agent.handleRequest(intentMap);
});


app.post('/translate', (req, res) => {
    async function translation() {
        try {
            let origin = req.body.translate;
            let from = req.body.from;
            let to = req.body.to;

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
                console.log(trans);
                console.log(trans.data);
                console.log(trans.data.translations[0].translatedText);
                res.send(trans.data.translations[0].translatedText);

            });
        } catch (err) {
            console.log(err.stack);
        }
    }
    translation();
});


app.post('/speech', (req, res) => {
    let txt = req.query.speech;
    const options = {
        method: 'GET',
        url: 'https://voicerss-text-to-speech.p.rapidapi.com/',
        qs: {
            key: 'b444098b2ac043208c2a28ae81257e0e',
            src: txt,
            hl: 'en-us',
            r: '0',
            c: 'mp3',
            f: '44khz_16bit_stereo',
            b64: true
        },
        headers: {
            'x-rapidapi-key': '0f8cf47e8fmsh7eb7592c83f2397p16b37fjsn59e20603886f',
            'x-rapidapi-host': 'voicerss-text-to-speech.p.rapidapi.com',
            useQueryString: true
        }
    };

    requesting(options, function (error, response, body) {
        if (error) throw new Error(error);
        const sessionId = uuid.v4();

        async function makeMP3() {
            const file = await body;
            const writeFile = util.promisify(fs.writeFile);
            await writeFile(sessionId + '.mp3', file, 'base64');
            console.log('Audio content sessionId6 written to file: ' + sessionId + '.mp3');
            res.send("file has been made andis named: " + sessionId + ".mp3");
        }
        makeMP3();
    });
});

app.post('/talk', (req, res) => {
    let origin = req.body.translate;
    let from = req.body.from;
    let to = req.body.to;
    console.log(req);
    console.log(req.body);
    console.log(origin, from, to);

    async function speech(trans) {
        let txt = trans;
        const options = {
            method: 'GET',
            url: 'https://voicerss-text-to-speech.p.rapidapi.com/',
            qs: {
                key: 'b444098b2ac043208c2a28ae81257e0e',
                src: txt,
                hl: 'en-us',
                r: '0',
                c: 'mp3',
                f: '44khz_16bit_stereo',
                b64: true
            },
            headers: {
                'x-rapidapi-key': '0f8cf47e8fmsh7eb7592c83f2397p16b37fjsn59e20603886f',
                'x-rapidapi-host': 'voicerss-text-to-speech.p.rapidapi.com',
                useQueryString: true
            }
        };

        requesting(options, function (error, response, body) {
            if (error) throw new Error(error);
            const sessionId = uuid.v4();

            async function makeMP3() {
                const file = await body;
                const writeFile = util.promisify(fs.writeFile);
                await writeFile(sessionId + '.mp3', file, 'base64');
                console.log('Audio content sessionId6 written to file: ' + sessionId + '.mp3');
                res.send("file has been made andis named: " + sessionId + ".mp3");
            }
            makeMP3();
        });
    }
    async function translation() {
        try {
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
                console.log(trans);
                console.log(trans.data);
                console.log(trans.data.translations[0].translatedText);
                let talk = trans.data.translations[0].translatedText;
                speech(talk);
            });
        } catch (err) {
            console.log(err.stack);
        }
    }
    translation();

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});