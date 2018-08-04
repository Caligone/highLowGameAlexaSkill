const getSpeech = require('../helpers/getSpeech');
const GAME_STATES = require('../constants/gameStates');

exports.canHandle = handlerInput => {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
};

exports.handle = handlerInput => {
    const { locale } = handlerInput.requestEnvelope.request;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    let speechText = null;
    if (sessionAttributes.gameState === GAME_STATES.STARTED) {
        speechText = getSpeech(locale, 'WELCOME_WITH_GAME');
    } else {
        speechText = getSpeech(locale, 'WELCOME_NO_GAME');
    }
    return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
};
