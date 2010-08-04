/**
 *
 * @module Controls
 * @requires AJS, jQuery
 */

/**
 * If not visible, moves the scroll position of the screen to the element
 *
 * <pre>
 * <strong>Usage:</strong>
 * jQuery("li.item").moveTo();
 * </pre>
 *
 * @class moveTo
 * @constuctor moveTo
 * @namespace jQuery.fn
 * @param {Boolean} transition
 */
jQuery.fn.moveTo = function (transition) {

    var that = this,
        topOffset = this.offset().top,
        commandBarHeight = jQuery("#stalker").outerHeight() + 35,
        scrollTarget,
        undetachedStalker = jQuery("#stalker.not(.detached)");

    if (undetachedStalker.length > 0 && (topOffset <= undetachedStalker.offset().top)) {
        commandBarHeight = 0;
    }

    if ((jQuery(window).scrollTop() + jQuery(window).height() - this.outerHeight() < topOffset ||
            jQuery(window).scrollTop() + commandBarHeight > topOffset) &&
            jQuery(window).height() > commandBarHeight) {


        if(jQuery(window).scrollTop() + commandBarHeight > topOffset) {
            //move up
            scrollTarget = topOffset - (jQuery(window).height() - this.outerHeight()) + 35;
        } else {
            //move down
            scrollTarget = topOffset - commandBarHeight;
        }

        if (!jQuery.fn.moveTo.animating && transition) {
            jQuery(document).trigger("moveToStarted", this);
            jQuery.fn.moveTo.animating = true;
            jQuery("html,body").animate({
                scrollTop: scrollTarget
            }, 1000, function () {
                // safari needs this to ensure scrollEvent is actually fired
                jQuery("#stalker").trigger("positionChanged");
                jQuery(document).trigger("moveToFinished", that);
                delete jQuery.fn.moveTo.animating;
            });
            return this;
        } else {

            if (jQuery('html, body').is(":animated")) {
                jQuery('html, body').stop();
                delete jQuery.fn.moveTo.animating;
            }

            jQuery(document).trigger("moveToStarted");
            jQuery(window).scrollTop(scrollTarget);
            // safari needs this to ensure scrollEvent is actually fired
            jQuery("#stalker").trigger("positionChanged");
            //need to put a slight timeout for the moveToFinished event such that recipients of this event
            //have time to act on it.
            setTimeout(function() {
                jQuery(document).trigger("moveToFinished", that);
            }, 100);
            return this;
        }
    }
    jQuery(document).trigger("moveToFinished", this);
    return this;
};