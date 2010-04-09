/**
 * The Atlassian Event System.
 * Binds and triggers events on the top level window.
 * The try/catch is to handle the case where you don't have permission to access to window.top.
 */
AJS.bind = function (eventType, eventData, handler) {
    try {
        return jQuery(window.top).bind(eventType, eventData, handler);
    } catch (e) {
         try {
            return jQuery(window).bind(eventType, eventData, handler);
        } catch (e) {
            AJS.log("error while binding: " + e.message);
        }
    }
};

AJS.unbind = function (eventType, handler) {
    try {
        return jQuery(window.top).unbind(eventType, handler);
    } catch (e) {
         try {
            return jQuery(window).unbind(eventType, handler);
        } catch (e) {
            AJS.log("error while triggering: " + e.message);
        }
    }
};

AJS.trigger = function(eventType, extraParameters) {
    try {
        return jQuery(window.top).trigger(eventType, extraParameters);
    } catch (e) {
         try {
            return jQuery(window).trigger(eventType, extraParameters);
        } catch (e) {
            AJS.log("error while triggering: " + e.message);
        }
    }
};