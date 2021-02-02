// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START dialogflow_quickstart]

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const util = require('util');
const fs = require('fs');
const request = require('request');
const {
  constants
} = require('buffer');
const fetch = require("node-fetch");




const options = {
  method: 'GET',
  url: 'https://voicerss-text-to-speech.p.rapidapi.com/',
  qs: {
    key: 'b444098b2ac043208c2a28ae81257e0e',
    src: 'hello bitch, i do not want to see you',
    hl: 'en-us',
    r: '0',
    c: 'mp3',
    f: '44khz16bitstereo'
  },
  headers: {
    'x-rapidapi-key': '0f8cf47e8fmsh7eb7592c83f2397p16b37fjsn59e20603886f',
    'x-rapidapi-host': 'voicerss-text-to-speech.p.rapidapi.com',
    useQueryString: true
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  /* fs.writeFile('writeMe.mp3', body, function(err, result) {
    if(err) console.log('error', err);
  }); */

  const sessionId = uuid.v4();
  const sessionId2 = uuid.v4();
  const sessionId3 = uuid.v4();
  const sessionId4 = uuid.v4();
  const sessionId5 = uuid.v4();
  const sessionId6 = uuid.v4();
  async function fuck() {
    /* let api = await fetch('http://api.voicerss.org/?key=b444098b2ac043208c2a28ae81257e0e&hl=en-us&c=MP3&f=16khz_16bit_stereo&src=Hello,%20world!');
    console.log(api); */

    async function getData() {
      let response = await fetch(`http://api.voicerss.org/?key=b444098b2ac043208c2a28ae81257e0e&hl=en-us&c=MP3&f=16khz_16bit_stereo&src=Hello,%20world!`);
      if (response.status == 200) {
        console.log(response);
        return await response;
      } else {
        console.log('fuck');
      }
    }
    let test = getData();
    console.log('data ', test);
    /* var json = await res.json(); */

    let data = JSON.stringify(test);
    console.log('data ', data);
    /* const file = await body;
    const file2 = await response.body;
    const file3 = await response.body;
    const file4 = await response.body;

    var data = await file3.replace(/^data:mp3\/\w+;base64,/, "");
    var buf = Buffer.from(data, 'base64');

    var base64File = Buffer.from( file4, 'binary').toString('base64');
    var decodedFile = Buffer.from( base64File, 'base64').toString('binary');

    fs.writeFile(sessionId5 + '.mp3', decodedFile, 'base64', function (err, result) {
      if (err) console.log('error', err);
      console.log('Audio content sessionId5 written to file: ' + sessionId5 + '.mp3');
    });

    console.log('body begin');
    console.log(file);
    fs.writeFile(sessionId + '.mp3', file, 'base64', function (err, result) {
      if (err) console.log('error', err);
      console.log('Audio content sessionId written to file: ' + sessionId + '.mp3');
    });
    console.log('body end');
    console.log('response begin');
    console.log(response);
    console.log('response end');
    console.log('response body begin');
    console.log(file2);
    fs.writeFile(sessionId2 + '.mp3', file2, 'base64', function (err, result) {
      if (err) console.log('error', err);
      console.log('Audio content sessionId2 written to file: ' + sessionId2 + '.mp3');
    });
    console.log('response body end');

    const writeFile = util.promisify(fs.writeFile);
    await writeFile(sessionId3 + '.mp3', file, 'binary');
    console.log('Audio content sessionId3 written to file: ' + sessionId3 + '.mp3');

    await writeFile(sessionId4 + '.mp3', decodedFile, 'base64');
    console.log('Audio content sessionId4 written to file: ' + sessionId4 + '.mp3');

    await writeFile(sessionId6 + '.mp3', file, 'base64');
    console.log('Audio content sessionId6 written to file: ' + sessionId6 + '.mp3'); */
  }

  fuck();

});

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
/* async function detectIntent(
    projectId,
    sessionId,
    query,
    contexts,
    languageCode
  ) {
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId
    );

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode,
        },
      },
    };

    if (contexts && contexts.length > 0) {
      request.queryParams = {
        contexts: contexts,
      };
    }

    const responses = await sessionClient.detectIntent(request);
    return responses[0];
  }


async function runSample(projectId = 'travelbot-pxus') {
  // A unique identifier for the given session
const sessionId = uuid.v4();
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
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
console.log(`  Query: ${result.queryText}`);
console.log(`  Response: ${result.fulfillmentText}`);
if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
} else {
    console.log('  No intent matched.');
}
}
// [END dialogflow_quickstart]

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

runSample(...args).catch(console.error); */