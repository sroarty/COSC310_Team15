// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues

"use strict";
const API_KEY = "";
const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");
const { Client } = require("@googlemaps/google-maps-services-js");

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

function getCoords(userAddress) {
  //----- Testing Maps
  console.log("Creating client\n");
  var client = new Client({});
  var userLat;
  var userLong;

  client
    .geocode({
      params: {
        address: userAddress,
        key: API_KEY,
      },
      timeout: 2000, // milliseconds
    })
    .then((r) => {
      console.log("--MAPS CALL SUCCEEDED--");
      userLat = r.data.results[0].geometry.location.lat;
      userLong = r.data.results[0].geometry.location.lng;
      console.log("\nUSER LAT: " + userLat);
      console.log("\nUSER LONG: " + userLong);
    })
    .catch((e) => {
      console.log("--SECOND MAPS CALL FAILED---");
      console.log(e.response.data.error_message);
    });
  console.log("Second maps function finished\n");
  return [userLat, userLong];
}

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  (request, response) => {
    const agent = new WebhookClient({ request, response });
    /*console.log("---");
    console.log(
      "Dialogflow Request headers: " + JSON.stringify(request.headers)
    );
    console.log("Dialogflow Request body: " + JSON.stringify(request.body));
    console.log(
      "Dialogflow Response headers: " + JSON.stringify(response.headers)
    );
    console.log("Dialogflow Response body: " + JSON.stringify(response.body));
    console.log("---");*/

    function WebCallIntent(agent) {
      // parameters gathered by the QueryHandler
      var painType = agent.parameters["paintypes"];
      var injury = agent.parameters["injury"];
      var location = agent.parameters["specific-location"];
      var causeOfPain = agent.parameters["causeOfPain"];
      // contains all the information from the HTTP request form dialogFlow
      var json = request.body;
      // name of the agent making the back-end request
      var agentName = json.queryResult.intent.name.split("/");
      agentName = agentName[1];
      // CASE: Default group-project agent
      if (agentName == "testagent-ct99") defaultAgent(agent);
      if (agentName == "AmeliaPlaceholder") ameliaAgent(agent);
      if (agentName == "SeanPlaceholder") seanAgent(agent);
      if (agentName == "chatbot-physio-bglf") ryanAgent(agent);
      if (agentName == "AmneetPlaceholder") amneetAgent(agent);
      if (agentName == "DaniilPlaceholder") daniilAgent(agent);
      console.log("\nHere is the lattitude: " + getCoords("802 Academy Way, Kelowna, BC")[0]);
      function ameliaAgent(agent) {
        // code here
      }
      function seanAgent(agent) {
        // code here
      }
      function ryanAgent(agent) {
        // code here
      }
      function amneetAgent(agent) {
        // code here
      }
      function daniilAgent(agent) {
        // code here
      }

      function defaultAgent(agent) {
        // --- ARMS ---
        if (location == "hand") {
          if (injury == "burn") callEvent(agent, "HandBurn");
          else if (painType == "stiff") callEvent(agent, "StiffHand");
          else callEvent(agent, "HandPain");
        }

        if (location == "elbow") {
          if (painType == "sharp pain") callEvent(agent, "SharpPainElbow");
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
        if (location == "chest") callEvent(agent, "ChestPain");
        if (location == "legs") callEvent(agent, "LegPain");

        if (location == "ankle") {
          if (causeOfPain == "rolled") callEvent(agent, "rolled");
          else callEvent(agent, "anklePain");
        }
        // ------------

        // --- HEAD & NECK ---
        if (location == "head") {
          if (painType == "stabbing") callEvent(agent, "StabbingHeadache");
          else callEvent(agent, "HeadPain");
        }
        if (location == "neck") callEvent(agent, "NeckPain");
        // ------------

        // --- UPPER BODY ---
        if (location == "back") callEvent(agent, "BackPain");
        // -----------
      }
    }

    function WebCallExercise(agent) {
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
      agent.add("dummy text"); // dummy text is required for some reason
      agent.setFollowupEvent(event);
    }

    // Run the proper function handler based on the matched Dialogflow intent name
    console.log("---- Beginning of Call ----");

    let intentMap = new Map();
    intentMap.set("ExerciseQueryHandler", WebCallExercise);
    intentMap.set("QueryHandler", WebCallIntent);
    agent.handleRequest(intentMap);
  }
);
