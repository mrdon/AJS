/**
 * scrollIntoView jQuery plugin
 *
 * Scroll the window if necessary so that the first element of a jQuery collection
 * is visible and best fit into the space available.
 *
 * @method scrollIntoView
 * @param {object} options -- has the following keys:
 *    duration ....... The duration of the scroll animation.
 *    marginTop ...... The margin between target element and the top window edge.
 *    marginBottom ... The margin between target element and the bottom window edge.
 *    callback ....... A function to be called when the animation is complete.
 * @return {jQuery}
 */
jQuery.fn.scrollIntoView = function(options) {

    if (this.length > 0 && !this.hasFixedParent()) {

        options              = options              || {};
        options.marginTop    = options.marginTop    || options.margin || 0;
        options.marginBottom = options.marginBottom || options.margin || 0;

        // If the item is not visible we callback but do not scroll to item
        if (!this.is(":visible") && options.callback) {
            options.callback();
            return this;
        }

        var $window      = window.top.jQuery(window.top);
        var $stalker     = window.top.jQuery("#stalker");
        var scrollTop    = $window.scrollTop();
        var scrollHeight = $window.height();
        var offsetTop    = Math.max(0, getPageY(this[0]) - options.marginTop);
        var offsetHeight = options.marginTop + this.outerHeight() + options.marginBottom;
        var newScrollTop = scrollTop;

        // Fit this element's baseline inside window.
        if (newScrollTop + scrollHeight < offsetTop + offsetHeight) {
            newScrollTop = offsetTop + offsetHeight - scrollHeight;
        }

        // Accommodate stalker if it exists.
        if ($stalker.length > 0) {
            offsetTop -= $stalker.outerHeight() + 35;
        }

        // Fit this element's top edge inside the window.
        if (newScrollTop > offsetTop) {
            newScrollTop = offsetTop;
        }

        if (newScrollTop !== scrollTop) {

            var $target   = this;
            var $document = window.top.jQuery(window.top.document);

            $document.trigger("moveToStarted", $target);

            $document.find("body, html").stop(true).animate(
                {
                    scrollTop: newScrollTop
                },
                options.duration || 100,
                "swing",
                function() {
                    if (options.callback) {
                        options.callback();
                    }
                    $document.trigger("moveToFinished", $target);
                    $stalker.trigger("positionChanged");
                }
            );
        } else if (options.callback) {
            options.callback();
        }
    }

    return this;

    function getPageY(element) {
        var offsetTop = 0;

        do {
            offsetTop += element.offsetTop;
        } while (element = element.offsetParent);

        return offsetTop;
    }
};
