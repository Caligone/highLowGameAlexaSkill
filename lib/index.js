const Alexa = require('ask-sdk-core');

/* Defaults handlers */
const CancelAndStopIntentHandler = require('./handlers/cancelAndStopIntentHandler');
const ErrorHandler = require('./handlers/errorHandler');
const HelpIntentHandler = require('./handlers/helpIntentHandler');
const LaunchRequestHandler = require('./handlers/launchRequestHandler');
const SessionEndedRequestHandler = require('./handlers/sessionEndedRequestHandler');

/* Custom handlers */
const StartNewGameIntentHandler = require('./handlers/startNewGameIntentHandler');
const StopGameIntentHandler = require('./handlers/stopGameIntentHandler');
const TryIntentHandler = require('./handlers/tryIntentHandler');

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        CancelAndStopIntentHandler,
        HelpIntentHandler,
        LaunchRequestHandler,
        SessionEndedRequestHandler,
        StartNewGameIntentHandler,
        StopGameIntentHandler,
        TryIntentHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
