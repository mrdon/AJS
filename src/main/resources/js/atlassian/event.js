/**
* The Atlassian Event System
*/
AJS.bind = function (eventType, eventData, handler) {
    var win = window;
    while (win.top != win) {
        win = win.top;
    }
    return jQuery(win).bind(eventType, eventData, handler);
};

AJS.trigger = function(eventType, extraParameters) {
    var win = window;
    while (win.top != win) {
        win = win.top;
    }
    return jQuery(win).trigger(eventType, extraParameters);
};