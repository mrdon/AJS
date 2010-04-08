/**
* The Atlassian Event System
*/
AJS.bind = function (eventType, eventData, handler) {
    return jQuery(window.top).bind(eventType, eventData, handler);
};

AJS.unbind = function (eventType, handler) {
    return jQuery(window.top).unbind(eventType, handler);
};

AJS.trigger = function(eventType, extraParameters) {
    return jQuery(window.top).trigger(eventType, extraParameters);
};