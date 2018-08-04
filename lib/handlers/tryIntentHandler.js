const getSlotValues = require('../helpers/getSlotValuesHelper');
const getSpeech = require('../helpers/getSpeech');

const GAME_STATES = require('../constants/gameStates');

exports.canHandle = handlerInput => {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    return (
        handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        handlerInput.requestEnvelope.request.intent.name === 'TryIntent'
    );
};

exports.handle = handlerInput => {
    const { locale } = handlerInput.requestEnvelope.request;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const slotValues = getSlotValues(
        handlerInput.requestEnvelope.request.intent.slots,
    );
    const userInputNumber = Number.parseInt(
        slotValues.USER_INPUT_NUMBER.resolved,
        10,
    );
    userInputNumber;
    let speechText = null;
    if (userInputNumber > sessionAttributes.guessNumber) {
        sessionAttributes.count += 1;
        speechText = getSpeech(locale, 'TRY_LESS_RESULT', {
            'INPUT_NUMBER': userInputNumber,
        });
    } else if (userInputNumber < sessionAttributes.guessNumber) {
        sessionAttributes.count += 1;
        speechText = getSpeech(locale, 'TRY_MORE_RESULT', {
            'INPUT_NUMBER': userInputNumber,
        });
    } else if (userInputNumber === sessionAttributes.guessNumber) {
        sessionAttributes.count += 1;
        speechText = speechText = getSpeech(locale, 'TRY_WIN_RESULT', {
            'COUNT': sessionAttributes.count,
        });
        sessionAttributes.gameState = GAME_STATES.ENDED;
    } else if (sessionAttributes.gameState !== GAME_STATES.STARTED) {
        speechText = getSpeech(locale, 'NO_GAME');
    } else {
        speechText = getSpeech(locale, 'UNKNOWN_NUMBER');
    }
    return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
};
