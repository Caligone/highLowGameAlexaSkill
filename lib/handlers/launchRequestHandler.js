const SPEECH = require('../constants/speech');
const GAME_STATES = require('../constants/gameStates');

exports.canHandle = handlerInput => {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
};

exports.handle = handlerInput => {
    const { locale } = handlerInput.requestEnvelope.request;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    let speechText = null;
    if (sessionAttributes.gameState === GAME_STATES.STARTED) {
        speechText = SPEECH[locale].WELCOME_WITH_GAME;
    } else {
        speechText = SPEECH[locale].WELCOME_NO_GAME;
    }
    return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
};
