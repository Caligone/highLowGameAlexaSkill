const getSlotValues = require('../helpers/getSlotValuesHelper');

const SPEECH = require('../constants/speech');
const GAME_STATES = require('../constants/gameStates');

exports.canHandle = handlerInput => {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    return (
        handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        handlerInput.requestEnvelope.request.intent.name === 'StopGameIntent' &&
        !Number.isNaN(Number.parseFloat(sessionAttributes.guessNumber)) &&
        Number.isFinite(sessionAttributes.guessNumber) &&
        sessionAttributes.gameState === GAME_STATES.STARTED
    );
};

exports.handle = handlerInput => {
    const { locale } = handlerInput.requestEnvelope.request;

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.gameState = GAME_STATES.ENDED;
    const speechText = SPEECH[locale].GAME_CANCELED.replace(
        '{GUESS_NUMBER}',
        sessionAttributes.guessNumber,
    );
    return handlerInput.responseBuilder.speak(speechText).getResponse();
};
