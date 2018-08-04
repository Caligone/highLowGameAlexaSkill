const getSlotValues = require('../helpers/getSlotValuesHelper');

const GAME_STATES = require('../constants/gameStates');
const GAME_DIFFICULTIES = require('../constants/gameDifficulties');
const SPEECH = require('../constants/speech');

exports.canHandle = handlerInput => {
    return (
        handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        handlerInput.requestEnvelope.request.intent.name ===
            'StartNewGameIntent'
    );
};

exports.handle = handlerInput => {
    const { locale } = handlerInput.requestEnvelope.request;
    const slotValues = getSlotValues(
        handlerInput.requestEnvelope.request.intent.slots,
    );
    let difficulty = 2;
    if (slotValues.GAME_DIFFICULTY && slotValues.GAME_DIFFICULTY.id) {
        difficulty = slotValues.GAME_DIFFICULTY.id;
    }
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    let speechText = null;
    if (sessionAttributes.gameState === GAME_STATES.STARTED) {
        speechText = SPEECH[locale].ALREADY_IN_GAME;
    } else {
        const { min, max } = GAME_DIFFICULTIES[difficulty];
        sessionAttributes.gameState = GAME_STATES.STARTED;
        sessionAttributes.count = 0;
        // Avoid picking a number ending by 9\d
        // Until Amazon Alexa Skill properly handle this numbers
        // ie 98, 7291,...
        do {
            sessionAttributes.guessNumber =
            Math.floor(Math.random() * (max - min + 1)) + min;
        } while (/9\d{1}$/.test(`${sessionAttributes.guessNumber}`))
        speechText = SPEECH[locale].GAME_STARTED;
    }

    return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
};
