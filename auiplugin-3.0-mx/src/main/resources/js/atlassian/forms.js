/**
* Forms: Inline Help - toggles visibility of inline help content.
*
*   Originally authored by Martin Jopson
*
*   Version: 0.1
*
*   @method inlineHelp
*   @namespace AJS
*
*/

AJS.inlineHelp = function () {
    AJS.$(".icon-inline-help").click(function(){
        var $t = AJS.$(this).siblings(".field-help");
        if ($t.hasClass("hidden")){
            $t.removeClass("hidden");
        } else {
            $t.addClass("hidden");
        }
    });
};