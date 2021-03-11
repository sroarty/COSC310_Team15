'use strict';

const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow({debug: true});

const QUERYHANDLER_INTENT = 'QueryHandler';
const LEG_PAIN_INTENT = 'Leg pain';
const UPPER_LEG_INTENT = 'Upper Leg pain';

const GEN_LOCATION_ENTITY = 'general-location';
const SPEC_LOCATION_ENTITY = 'specific-location';

app.intent('Default Welcome Intent', (conv) => {
  // Do things
});
app.intent(QUERYHANDLER_INTENT, (conv) => {
  const genpainloc = conv.parameters(GEN_LOCATION_ENTITY);
  if(genpainloc == "legs"){
    const specpainloc = conv.parameters(SPEC_LOCATION_ENTITY);
    conv.ask("Is the pain located in your upper or lower legs?");
  }
  else{
    conv.ask("Where is the pain located?");
  }
});
exports.yourAction = functions.https.onRequest(app);
