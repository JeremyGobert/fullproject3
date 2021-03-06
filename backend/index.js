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

/* const dialogflow = require('@google-cloud/dialogflow'); */
const uuid = require('uuid');
const util = require('util');
const fs = require('fs');
const request = require('request');




const options = {
  method: 'GET',
  url: 'https://voicerss-text-to-speech.p.rapidapi.com/',
  qs: {
    key: 'b444098b2ac043208c2a28ae81257e0e',
    src: 'hello bitch, i do not want to see you',
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

  request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const sessionId = uuid.v4();

      async function makeMP3() {
          const file = await body;
          const writeFile = util.promisify(fs.writeFile);
          await writeFile(sessionId + '.mp3', file, 'base64');
          console.log('Audio content sessionId6 written to file: ' + sessionId + '.mp3');
      }
      makeMP3();
  }


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