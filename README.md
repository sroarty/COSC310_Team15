# Interactive Physiotherapist Agent
**Purpose of our project:** Our conversational agent is created to hold a conversation of at least 30 turns. Each turn is an instance of a prompt and a bot response. The conversations are based on a user who needs exercises that aid in phsical therapy. The user lets the bot know of the specfic location of their injury as well as the type of pain they are experiencing. The bot then responds accordingly asking for more information to best determine what exercise would be best suitable.  

## Class Organization & How to compile and run the code.
Since we have integrated Google's DialogFlow API for our project, we have implemented a QueryHandler intent within our DialogFlow agent which collects the parameters from a user prompt such as the indicated pain, location of pain etc. Here we have our back-end. Based on the information gathered by the QueryHandler the back-end then calls the event that is attached to the correct intent. In other words, an intent is called by invoking an event from the back-end.

###Specifics about index.js:
WebCallIntent function - assigns a variable to an agent parameter; consider this funtion to be what gathers the parameters from the QueryHandler
CallEvent function - when this function is used to set a follow up event given a specific agent and event.
If/Else statemets - identify location (body part that user inputs) in order to call the associated event.

**Breakdown of how a conversation is outlined:**
https://github.com/sroarty/COSC310_Team15/blob/main/outline.pdf
