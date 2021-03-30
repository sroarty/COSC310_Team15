// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues

'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));


  function WebCallIntent(agent) {   
    // parameters gathered by the QueryHandler
    var painType = agent.parameters["paintypes"];
    var injury = agent.parameters["injury"];
    var location = agent.parameters["specific-location"];
    var causeOfPain = agent.parameters["causeOfPain"];

    
    // Using the parameters above, the correct intent can
    // be called by invoking the event attached. By default,
    // the intent is based on location, but paintypes and
    // whether or not it is the result of an injury can also
    // be used. Also note that you can do follow-up intents
    // from the intent invoked by the event call, like normal.
    //
    // To add:
    // -- Create desired intent.
    // -- Inside theintent screen, attach the desired event name under the Events section.
    // -- At the bottom of the intent screen, select:
    // -- - Enable webhook call for this intent
    // -- - Enable webhook call for slot filling

    // --- ARMS ---
    if(location == "hand") {
      if(injury == "burn") callEvent(agent, "HandBurn");
      else if(painType == "stiff") callEvent(agent, "StiffHand");
      else callEvent(agent, "HandPain");
    } 

    if(location == "elbow"){
      if(painType =="sharp pain") callEvent(agent,"SharpPainElbow");
      else callEvent(agent, "ElbowPain");
    }

    if (location == "wrist") callEvent(agent, "WristPain");
    if (location == "forearm") callEvent(agent, "ForearmPain");
    if (location == "bicep") callEvent(agent, "BicepPain");
    if (location == "tricep") callEvent(agent, "TricepPain");
    if (location == "shoulder") callEvent(agent, "ShoulderPain");
    // -----------

    // --- LEGS ---
    if (location == "calves") callEvent(agent, "calfpain");
    if (location == "feet") callEvent(agent, "footpain");
    if (causeOfPain == "walking") callEvent(agent, "walkingPain");
    if(location == "chest") callEvent(agent, "ChestPain");
    if(location == "legs") callEvent(agent, "LegPain");

    if (location == "ankle") {
      if(causeOfPain == "rolled") callEvent(agent, "rolled");
      else callEvent(agent, "anklePain");    
    }
    // ------------

    // --- HEAD & NECK ---
    if(location == "head") {
      if(painType == "stabbing") callEvent(agent, "StabbingHeadache");
      else callEvent(agent, "HeadPain");
    }
    if (location == "neck") callEvent(agent, "NeckPain");
    // ------------


    // --- UPPER BODY --- 
    if(location == "back") callEvent(agent, "BackPain");
    // -----------
    
  }
  function WebCallExercise(agent){
    var location = agent.parameters["specific-location"];
    
    if (location == "bicep") callEvent(agent, "ExerciseBicep");
    else if (location == "tricep") callEvent(agent, "ExerciseTricep");
    else if (location == "shoulder") callEvent(agent, "ExerciseShoulder");
    else if (location == "abs") callEvent(agent, "ExerciseAbdomen");
    else if (location == "chest") callEvent(agent, "ExerciseChest");
    else if (location == "quads") callEvent(agent, "ExerciseQuadricep");
    else if (location == "calf") callEvent(agent, "ExerciseCalf");
    else if (location == "hamstring") callEvent(agent, "ExerciseHamstring");
    else callEvent(agent, "noExercise");
  }

  // -- Calls the event attached to a specific intent
  // -- which switches the chatbot to that intent
  function callEvent(agent, event) {
    agent.add('dummy text'); // dummy text is required for some reason
    agent.setFollowupEvent(event);
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('ExerciseQueryHandler',WebCallExercise);
  intentMap.set('QueryHandler', WebCallIntent);
  agent.handleRequest(intentMap);
}); 