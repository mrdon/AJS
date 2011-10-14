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
 * This plugin also supports options as an argument.  The options
 * that can be defined are:
 * <ul>
 * <li>transition - if set to true will cause a smooth scrolling transition (false by default)</li>
 * <li>scrollOffset - defines an offset to scroll past the element to view in pixels such that
 * all of it can be viewed (35 pixels by default)</li>
 * </ul>
 *
 * @class moveTo
 * @constuctor moveTo
 * @namespace jQuery.fn
 * @param {Object} options
 */
jQuery.fn.moveTo = function (options) {
    var defaults = {
        transition: false,
        scrollOffset: 35
    };

    var opts = jQuery.extend(defaults, options),
        instance = this,
        topOffset = instance.offset().top,
        $stalker = jQuery("#stalker"),
        commandBarHeight = $stalker.outerHeight() + opts.scrollOffset,
        scrollTarget;

    if ($stalker.length === 0 || (!$stalker.hasClass("detached") && (topOffset <= $stalker.offset().top))) {
        commandBarHeight = 0;
    }

    if ((jQuery(window).scrollTop() + jQuery(window).height() - this.outerHeight() < topOffset ||
            jQuery(window).scrollTop() + commandBarHeight > topOffset) &&
            jQuery(window).height() > commandBarHeight) {


        if(jQuery(window).scrollTop() + commandBarHeight > topOffset) {
            //move up
            scrollTarget = topOffset - (jQuery(window).height() - this.outerHeight()) + opts.scrollOffset;
        } else {
            //move down
            scrollTarget = topOffset - commandBarHeight;
        }

        if (!jQuery.fn.moveTo.animating && opts.transition) {
            jQuery(document).trigger("moveToStarted", this);
            jQuery.fn.moveTo.animating = true;
            jQuery("html,body").animate({
                scrollTop: scrollTarget
            }, 1000, function () {
                // safari needs this to ensure scrollEvent is actually fired
                $stalker.trigger("positionChanged");
                jQuery(document).trigger("moveToFinished", instance);
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
            $stalker.trigger("positionChanged");
            //need to put a slight timeout for the moveToFinished event such that recipients of this event
            //have time to act on it.
            setTimeout(function() {
                jQuery(document).trigger("moveToFinished", instance);
            }, 100);
            return this;
        }
    }
    jQuery(document).trigger("moveToFinished", this);
    return this;
};