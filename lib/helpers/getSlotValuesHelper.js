module.exports = function getSlotValuesHelper(filledSlots) {
    //given event.request.intent.slots, a slots values object so you have
    //what synonym the person said - .synonym
    //what that resolved to - .resolved
    //and if it's a word that is in your slot values - .isValidated
    let slotValues = {};

    Object.keys(filledSlots).forEach(function(item) {
        var name = filledSlots[item].name;
        if (
            filledSlots[item] &&
            filledSlots[item].resolutions &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code
        ) {
            switch (
                filledSlots[item].resolutions.resolutionsPerAuthority[0].status
                    .code
            ) {
                case 'ER_SUCCESS_MATCH':
                    slotValues[name] = {
                        synonym: filledSlots[item].value,
                        resolved:
                            filledSlots[item].resolutions
                                .resolutionsPerAuthority[0].values[0].value
                                .name,
                        id:
                            filledSlots[item].resolutions
                                .resolutionsPerAuthority[0].values[0].value.id,
                        isValidated: true,
                    };
                    break;
                case 'ER_SUCCESS_NO_MATCH':
                    slotValues[name] = {
                        synonym: filledSlots[item].value,
                        resolved: filledSlots[item].value,
                        isValidated: false,
                    };
                    break;
            }
        } else {
            slotValues[name] = {
                synonym: filledSlots[item].value,
                resolved: filledSlots[item].value,
                isValidated: false,
            };
        }
    }, this);
    return slotValues;
};
