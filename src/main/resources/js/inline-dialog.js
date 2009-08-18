(function($) {
    /**
     * Creates a new inline dialog
     *
     * @param items jQuery object - the items that trigger the display of this popup when the user mouses over.
     * @param identifier A unique identifier for this popup. This should be unique across all popups on the page and a valid CSS class.
     * @param url The URL to retrieve popup contents.
     * @param initCallback
     * @param options Custom options to change default behaviour. See AJS.InlineDialog.opts for default values and valid options.
     *
     * @return jQuery object - the popup that was created
     */
    AJS.InlineDialog = function(items, identifier, url, options) {
        var opts = $.extend(false, AJS.InlineDialog.opts, options);
        var hideDelayTimer;
        var showTimer;
        var beingShown = false;
        var shouldShow = false;
        var contentLoaded = false;
        var mousePosition;
        var targetPosition;
        $(opts.container).append($('<div id="inline-dialog-' + identifier + '" class="aui-inline-dialog"><div class="contents"></div><div id="arrow-' + identifier + '" class="arrow"></div></div>'));
        var popup = $("#inline-dialog-" + identifier);
        var arrow = $("#arrow-" + identifier);
        var contents = popup.find(".contents");

//        AJS.log(opts);

        contents.css("width", opts.width + "px");
        contents.mouseover(function(e) {
            clearTimeout(hideDelayTimer);
            popup.unbind("mouseover");
            //e.stopPropagation();
        }).mouseout(function() {
            hidePopup();
        });

        var showPopup = function() {
            if (popup.is(":visible")) {
                return;
            }
            showTimer = setTimeout(function() {
                if (!contentLoaded || !shouldShow) {
                    return;
                }
                $(items).addClass("active");
                beingShown = true;
                // retrieve the position of the click target. The offsets might be different for different types of targets and therefore
                // either have to be customisable or we will have to be smarter about calculating the padding and elements around it

                var posx = targetPosition.target.offset().left + opts.offsetX;
                var posy = targetPosition.target.offset().top + targetPosition.target.height() + opts.offsetY;

                var diff = $(window).width() - (posx + opts.width + 30);
                if (diff<0) {
                    popup.css({
                        right: "20px",
                        left: "auto"
                    });
                    arrow.css({
                        left: -diff + (targetPosition.target.width() / 2) + "px",
                        right: "auto"
                    });
                } else {
                    popup.css({
                        left: posx + "px",
                        right: "auto"
                    });

                    arrow.css({
                        left: targetPosition.target.width() / 2 + "px",
                        right: "auto"
                    });
                }

                var bottomOfViewablePage = (window.pageYOffset || document.documentElement.scrollTop) + $(window).height();
                if ((posy + popup.height()) > bottomOfViewablePage) {
                    posy = bottomOfViewablePage - popup.height() - 5;
                    popup.mouseover(function() {
                        clearTimeout(hideDelayTimer);
                    }).mouseout(function() {
                        hidePopup();
                    });
                }
                popup.css({
                    top: posy + "px"
                });

                var shadow = $("#inline-dialog-shadow").appendTo(popup).show();
                // reset position of popup box
                popup.fadeIn(opts.fadeTime, function() {
                    // once the animation is complete, set the tracker variables
                    // beingShown = false; // is this necessary? Maybe only the shouldShow will have to be reset?
                });

                shadow.css({
                    width: contents.outerWidth() + 32 + "px",
                    height: contents.outerHeight() + 25 + "px"
                });
                $(".b", shadow).css("width", contents.outerWidth() - 26 + "px");
                $(".l, .r", shadow).css("height", contents.outerHeight() - 21 + "px");
                
                // iframeShim
                var arrowSpace = 7, // the negative space left for .aui-inline-dialog .arrow by its Top property
                    iframeShim = $("#inline-dialog-shim").appendTo(popup).show();
                iframeShim.css({
                    width: contents.outerWidth(),
                    height: contents.outerHeight() + arrowSpace
                });
                
            }, opts.showDelay);
        };

        var hidePopup = function(delay) {
            shouldShow = false;
            // only exectute the below if the popup is currently being shown
            if (beingShown) {
                delay = (delay == null) ? opts.hideDelay : delay;
                clearTimeout(hideDelayTimer);
                clearTimeout(showTimer);
                // store the timer so that it can be cleared in the mouseover if required
                hideDelayTimer = setTimeout(function() {
                    $(items).removeClass("active");
                    popup.fadeOut(opts.fadeTime, function() { opts.hideCallback.call(popup[0].popup); });
                    beingShown = false;
                    shouldShow = false;
                    if (!opts.cacheContent) {
                        //if not caching the content, then reset the
                        //flags to false so as to reload the content
                        //on next mouse hover.
                        contentLoaded = false;
                        contentLoading = false;
                    }
                }, delay);
            }
        };

        // the trigger is the jquery element that is triggering the popup (i.e., the element that the mousemove event is bound to)
        var initPopup = function(e,trigger) {
            $(".aui-inline-dialog").each(function() {
                if (typeof this.popup != "undefined")
                    this.popup.hide();
            });

            mousePosition = { x: e.pageX, y: e.pageY };
            var targetOffset = $(e.target).offset();
            targetPosition = {target: $(e.target)};

            if (!beingShown) {
                clearTimeout(showTimer);
            }
            shouldShow = true;
            var doShowPopup = function() {
                contentLoaded = true;
                opts.initCallback.call({
                    popup: popup,
                    hide: function () {hidePopup(0);},
                    id: identifier,
                    show: function () {showPopup();}
                });
                showPopup();
            };

            // lazy load popup contents
            if (!contentLoading) {
                contentLoading = true;
                if ($.isFunction(url)) {
                    // If the passed in URL is a function, execute it. Otherwise simply load the content.
                    url(contents, trigger, doShowPopup);
                } else {
                    contents.load(url, function() {
                        contentLoaded = true;
                        opts.initCallback.call({
                            popup: popup,
                            hide: function () {hidePopup(0);},
                            id: identifier,
                            show: function () {showPopup();}
                        });
                        showPopup();
                    });
                }
            }
            // stops the hide event if we move from the trigger to the popup element
            clearTimeout(hideDelayTimer);
            // don't trigger the animation again if we're being shown
            if (!beingShown) {
                showPopup();
            }
            return false;
        };

        popup[0].popup = {popup: popup, hide: function () {
            hidePopup(0);
        }, id: identifier, show: function () {
            showPopup();
        }};

        var contentLoading = false;
        if (opts.onHover) {
            $(items).mousemove(function(e) {
                initPopup(e,this);
            }).mouseout(function() {
                hidePopup();
            });
        } else {
            $(items).click(function(e) {
                initPopup(e,this);
                return false;
            }).mouseout(function() {
                hidePopup();
            });
        }

        contents.click(function(e) {
            e.stopPropagation();
        });

        $("body").click(function() {
            hidePopup(0);
        });

        return popup;
    };

    AJS.InlineDialog.opts = {
        onHover: false,
        fadeTime: 100,
        hideDelay: 10000,
        showDelay: 0,
        width: 300,
        offsetX: 0,
        offsetY: 10,
        container: "body",
        cacheContent : true,
        hideCallback: function(){}, // if defined, this method will be exected after the popup has been faded out.
        initCallback: function(){} // A function called after the popup contents are loaded. `this` will be the popup jQuery object, and the first argument is the popup identifier.
    };

    AJS.toInit(function() {
        $("body").append($('<iframe id="inline-dialog-shim" frameBorder="0"></iframe><div id="inline-dialog-shadow"><div class="tl"></div><div class="tr"></div><div class="l"></div><div class="r"></div><div class="bl"></div><div class="br"></div><div class="b"></div></div>'));
        $("#inline-dialog-shim").hide();
        $("#inline-dialog-shadow").hide();
    });
})(jQuery);