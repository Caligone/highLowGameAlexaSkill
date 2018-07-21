exports.canHandle = handlerInput => {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
};

exports.handle = handlerInput => {
    console.log(
        `Session ended with reason: ${
            handlerInput.requestEnvelope.request.reason
        }`,
    );

    return handlerInput.responseBuilder.getResponse();
};
