# Interactive Physiotherapist Agent
**Purpose of our project:** Our conversational agent is created to hold a conversation of at least 30 turns. Each turn is an instance of a prompt and a bot response. The conversations are based on a user who needs exercises that aid in phsical therapy. The user lets the bot know of the specfic location of their injury as well as the type of pain they are experiencing. The bot then responds accordingly asking for more information to best determine what exercise would be best suitable.  

## Class Organization & How to compile and run the code.
Since we have integrated Google's DialogFlow API for our project, we have implemented a QueryHandler intent within our DialogFlow agent which collects the parameters from a user prompt such as the indicated pain, location of pain etc. Here we have our back-end. Based on the information gathered by the QueryHandler the back-end then calls the event that is attached to the correct intent. In other words, an intent is called by invoking an event from the back-end.

## Specifics about index.js:
WebCallIntent function - assigns a variable to an agent parameter; consider this funtion to be what gathers the parameters from the QueryHandler.  
CallEvent function - when this function is used to set a follow up event given a specific agent and event.  
If/Else statemets - identify location (body part that user inputs) in order to call the associated event.

**Breakdown of how a conversation is outlined:**
https://github.com/sroarty/COSC310_Team15/blob/main/outline.pdf

# Updates for Assignment 3
## List of features implemented
- A simple GUI.  
- An extra topic. 
- 5 reasonable responses (when the user enters something outside the two topics). 
- Spelling mistakes (Fuzzy matching). 
- Entity Matching. 
- Synonym Recognition. 
- Sentiment Analysis. 
## Documentation
[How features are used to improve agent's conversation and snippets of a conversation to demonstrate the feature](./COSC310-%20Features%20Explanation.pdf)
  
[Level 0 Data Flow Diagram](./COSC310_Team15/blob/main/Level0_DFD.pdf)
  
[Level 1 Data Flow Diagram](./Level1_DFD.pdf)
  
[Summary of test cases](./COSC310-%20Test%20Cases.pdf)
  
[Sample output and limitations](./Sample%20output%20&%20limitations.pdf)
  
[Bonus:Design test cases using unit testing framework; test the correct intent metadata is extracted from the user query.](./testing/index-test.js)
  
[Final Documentation](./COSC%20310%20-%20Final%20Documentation.pdf)
  
# Update for Final individual project
## List of New Features
- Directions API (Attempted)
- Places API (Attempted)

## Explanation
In this assignment my plan was to attempt to integrate these two api's into my group's A3 output. Unfortunately i lacked the required experience and skillset to implement these features. My problems came from the fact that I was unable to properly formulate the request and response callse to the api and display the necessary output to the bot's chat feature. I hope this documentation is enough to warrant at least partial credit as I have invested many hours into learning how to try to implement these features



  
