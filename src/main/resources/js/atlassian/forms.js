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
	AJS.$('.icon-inline-help').click(function(){
		if(AJS.$(this).next().hasClass('field-help')){
			if (AJS.$(this).next().is(':visible')){
				AJS.$(this).next().css({'display':'none'});
			}
			else {
				AJS.$(this).next().css({'display':'block'});
			}
		};
	});
}();      /* TODO check if this is ok */
