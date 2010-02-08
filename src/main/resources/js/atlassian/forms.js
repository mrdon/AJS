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
        var $next = AJS.$(this).next();
        if($next.hasClass("field-help")){
            if ($next.hasClass("hidden")){
                $next.removeClass("hidden");
            } else {
                $next.addClass("hidden");
            }
        }
    });
};