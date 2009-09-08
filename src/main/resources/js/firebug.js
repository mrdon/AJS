/**
* Firebug notifier - to post a warning note about potential performance issues in our apps if Firebug is enabled
*
*   Originally authored by Lachlan Hardy
*
*   Version: 0.1
*
*   @method warnAboutFirebug
*   @namespace AJS
*   @param message {string} [optional] Contents of warning, defaults to English message if not specified
*
*/

AJS.warnAboutFirebug = function (message) {
    if (!AJS.Cookie.read(this.COOKIE_FB_WARNING) && window.console && window.console.firebug) {
        if (!message){
            var message = "Firebug is known to cause performance problems with Atlassian products. Try disabling it, if you notice any issues.";
        }
        var $warning = AJS.$("<div id='firebug-warning'><p>" + message + "</p><a class='close'>Close</a></div>");
        AJS.$("#firebug-warning a.close").live("click", function () {
            $warning.slideUp('fast', function() {
                AJS.Cookie.save(this.COOKIE_FB_WARNING, "true");
            });
        });
        $warning.prependTo(AJS.$("body"));
    }
};
