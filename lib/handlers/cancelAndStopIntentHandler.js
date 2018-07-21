const SPEECH = require('../constants/speech');

exports.canHandle = handlerInput => {
    return (
        handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        ['AMAZON.CancelIntent', 'AMAZON.StopIntent'].indexOf(
            handlerInput.requestEnvelope.request.intent.name,
        ) > -1
    );
};

exports.handle = handlerInput => {
    const { locale } = handlerInput.requestEnvelope.request;
    const speechText = SPEECH[locale].GOODBYE;
    return handlerInput.responseBuilder.speak(speechText).getResponse();
};
