/**
 * @module jQuery plugins
 * @requires AJS, jQuery, jQuery.fn.offsetAnchors
 * @since 2.2
 */

/**
 *
 * When scrolled past, attaches specified element to the top of the screen.
 *
 * <strong>Usage:</strong>
 * <code>
 * jQuery("#stalker").stalker();
 * </code>
 *
 * @class stalker
 * @constuctor stalker
 * @namespace jQuery.fn
 */

jQuery.fn.stalker = function (){

    var DETACHED_CLASS = "detached",
        PLACEHOLDER_CLASS = "stalker-placeholder",
        $win, /* jQuery wrapped window */
        $doc, /* jQuery wrapped document */
        $stalker, /* Element that will follow user scroll (Stalk) */
        $transitionElems, /* Elements preceding stalker */
        offsetY, /* offset top position of stalker */
        placeholder, /* A div inserted as placeholder for stalker */
        lastScrollPosY, /* Position last scrolled to */
        stalkerHeight, /* Height of stalker */
        isInitialized, /* Flag if control is initialized (onscroll) */
        selector; /* Selector for stalker */

    function isSupported() {
        if (jQuery.browser.msie && jQuery.browser.version < 7) {
            return false;
        };
        return true;
    }

    function getInactiveProperties () {

        if (jQuery.os.windows || jQuery.os.linux) {
            return {
                position: "absolute",
                top: offsetY
            };
        } else {
            return {
                position: "fixed",
                top: offsetY - $win.scrollTop()
            };
        }
    }

    function initialize() {

        $stalker = jQuery(selector),
        offsetY = $stalker.offset().top,
        $transitionElems = $stalker.prevAll(":visible");

        // need to set overflow to hidden for correct height in IE.
        function setStalkerHeight () {

            $stalker.css("overflow", "hidden");
            stalkerHeight = $stalker.outerHeight();
            $stalker.css("overflow", "");
        }

        // create a placeholder as our stalker bar is now fixed
        function createPlaceholder () {

            placeholder = jQuery("<div />")
                .addClass(PLACEHOLDER_CLASS)
                .css({visibility:"hidden", height: stalkerHeight})
                .insertBefore($stalker);
        }

        function setPlaceholderHeight () {

            if (!$stalker.hasClass(DETACHED_CLASS)) {
                placeholder.height(stalkerHeight);
            } else {
                placeholder.height($stalker.removeClass(DETACHED_CLASS).outerHeight());
                $stalker.addClass(DETACHED_CLASS);
            }
        }

        setStalkerHeight();
        createPlaceholder();
        setPlaceholderHeight();

        // set calculated fixed (or absolute) position
        $stalker.css(getInactiveProperties());

        /**
         * custom event to reset stalker placeholder height
         * @event stalkerHeightUpdated
         */
        $stalker.bind("stalkerHeightUpdated", setPlaceholderHeight);

         /**
         * custom event to reset stalker position
         * @event stalkerHeightUpdated
         */
        $stalker.bind("positionChanged", setStalkerPosition);

        isInitialized = true;
    }

    function offsetKeyboardInitiatedPageScrolling() {

        function setScrollPostion(scrollTarget) {

            var docHeight = jQuery.getDocHeight(),
                scrollPos;
            if (scrollTarget >= 0 && scrollTarget <= docHeight) {
                scrollPos = scrollTarget;
            } else if (scrollTarget >= $win.scrollTop()) {
                scrollPos = docHeight;
            } else if (scrollTarget < 0) {
                scrollPos = 0;
            }
            $win.scrollTop(scrollPos);
        }

        function pageUp() {

            if (!isInitialized) {
                initialize();
            }

            var scrollTarget = jQuery(window).scrollTop() - jQuery(window).height();

            setScrollPostion(scrollTarget + stalkerHeight);
        }

        function pageDown() {

            if (!isInitialized) {
                initialize();
            }

            var scrollTarget = jQuery(window).scrollTop() + jQuery(window).height();

            setScrollPostion(scrollTarget - stalkerHeight);
        }

        jQuery(function () {

            $doc.bind('keydown keypress keyup', {combi: "pagedown", disableInInput: true}, function (e) {

                if (!jQuery.browser.mozilla && e.type === "keydown") {
                    pageDown();
                } else if (jQuery.browser.mozilla && e.type === "keypress") {
                    pageDown();
                }
                e.preventDefault();
            });

            $doc.bind('keydown keypress keyup', {combi: "pageup", disableInInput: true}, function (e) {

                if (!jQuery.browser.mozilla && e.type === "keydown") {
                    pageUp();
                } else if (jQuery.browser.mozilla && e.type === "keypress") {
                    pageUp();
                }
                e.preventDefault();
            });

            $doc.bind('keydown keypress keyup', {combi: "space", disableInInput: true}, function (e) {

                if (!jQuery.browser.mozilla && e.type === "keydown") {
                    pageDown();
                } else if (jQuery.browser.mozilla && e.type === "keypress") {
                    pageDown();
                }
                e.preventDefault();
            });

            $doc.bind('keydown keypress keyup', {combi: "shift+space", disableInInput: true}, function (e) {

                if (!jQuery.browser.mozilla && e.type === "keydown") {
                    pageUp();
                } else if (jQuery.browser.mozilla && e.type === "keypress") {
                    pageUp();
                }
                e.preventDefault();
            });
        });
    }

    function containDropdownsInWindow () {

        $doc.bind("showLayer", function (e, type, obj) {

            var stalkerOffset,
                targetHeight;

            if (!isInitialized) {
               initialize();
            }

            if (type === "dropdown" && obj.$.parents(selector).length !== -1) {
                stalkerOffset = ($stalker.hasClass(DETACHED_CLASS) ? 0 : $stalker.offset().top);
                targetHeight = jQuery(window).height() - $stalker.outerHeight() - stalkerOffset;
                if (targetHeight <= parseInt(obj.$.attr("scrollHeight"), 10)) {
                    AJS.containDropdown.containHeight(obj, targetHeight);
                } else {
                    AJS.containDropdown.releaseContainment(obj);
                }
                obj.reset();
            }
        });
    }

    function handleAUIPopup () {

        $doc.bind("showLayer", function(e, type) {

            if ($transitionElems) {
                $transitionElems.css("opacity", "");
            }
            // firefox needs to reset the stalker position
            if (jQuery.browser.mozilla && type === "popup") {
                setStalkerPosition();
            }
        });
    }

    function setStalkerPosition () {

        function getOpacitySetting() {

            var opacityTarget = 1 - $win.scrollTop() / offsetY;
            if (opacityTarget > 1) {
                return "";
            } else if (opacityTarget < 0) {
                return 0;
            } else {
                return opacityTarget;
            }
        }

        if (!isInitialized) {
            initialize();
        }

        $transitionElems.css("opacity", getOpacitySetting());

        if (offsetY <= $win.scrollTop()){
            if (!$stalker.hasClass(DETACHED_CLASS)) {
                $stalker.css({top:0, position: "fixed"})
                    .addClass(DETACHED_CLASS);
            }
        } else {
            $stalker.css(getInactiveProperties())
                .removeClass(DETACHED_CLASS);
        }
        lastScrollPosY = $win.scrollTop();
    }

    function offsetAnchorLinksByStalkerHeight () {

        // offsets perm links, and any anchor's, scroll position so they are offset under ops bar
        jQuery(".stalker-placeholder, " + this.selector).offsetAnchors();
    }

    function assignEvents() {

         // we may need to update the height of the stalker placeholder, a click event could have caused changes to stalker
        // height. This should probably be on all events but leaving at click for now for performance reasons.
        $doc.click(function (e) {
            if (!isInitialized && jQuery(e.target).closest(selector).length !== 0) {
                initialize();
            }
        })
        .mouseup(function () {

            if (lastScrollPosY && $win.scrollTop() === lastScrollPosY) {
                $transitionElems.css("opacity", "   ");
            }
        });

        $win.scroll(setStalkerPosition)
        .resize(function () {

            if ($stalker) {
                $stalker.trigger("stalkerHeightUpdated");
            }
        });
    }

    if (!isSupported()) {
        return;
    }

    $win = jQuery(window);
    $doc = jQuery(document);
    selector = this.selector;

    assignEvents();
    offsetKeyboardInitiatedPageScrolling();
    containDropdownsInWindow();
    handleAUIPopup();
    offsetAnchorLinksByStalkerHeight();

    // only one instance allowed
    jQuery.fn.stalker = function () {
        throw "@method jQuery.fn.stalker: Only one stalker instance allowed, stalker for '" + selector + "' not applied";
    };

    return this;
};