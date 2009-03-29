(function($)
{
    /**
     * Creates a new hover popup
     *
     * @param items jQuery object - the items that trigger the display of this popup when the user mouses over.
     * @param identifier A unique identifier for this popup. This should be unique across all popups on the page and a valid CSS class.
     * @param url The URL to retrieve popup contents.
     * @param postProcess A function called after the popup contents are loaded.
     *                    `this` will be the popup jQuery object, and the first argument is the popup identifier.
     * @param options Custom options to change default behaviour. See AJS.inlineDialog.opts for default values and valid options.
     *
     * @return jQuery object - the popup that was created
     */
    AJS.InlineDialog = function(items, identifier, url, postProcess, options)
    {
        var opts = $.extend(AJS.InlineDialog.opts, options);
        var hideDelayTimer;
        var showTimer;
        var beingShown = false;
        var shouldShow = false;
        var contentLoaded = false;
        var mousePosition;
        var targetPosition;
        $(opts.container).append($('<div id="content-hover-' + identifier + '" class="ajs-content-hover"><div class="contents"></div><div id="arrow-' + identifier + '" class="arrow"></div></div>'));
        var popup = $("#content-hover-" + identifier);
        var arrow = $("#arrow-" + identifier);
        var contents = popup.find(".contents");

        contents.mouseover(function(e)
        {
            clearTimeout(hideDelayTimer);
            popup.unbind("mouseover");
            e.stopPropagation();

        });

        var showPopup = function()
        {
            if (popup.is(":visible"))
            {
                return;
            }

            $(items).addClass("active");
            showTimer = setTimeout(function()
            {
                if (!contentLoaded || !shouldShow)
                {
                    return;
                }
                beingShown = true;
                var posx = targetPosition.x - 3;
                var posy = targetPosition.y + 10;

                itemWidth = items.width();
                if (posx + opts.width + 30 > $(window).width())
                {
                    popup.css({
                        right: "20px",
                        left: "auto"
                    });

//                    console.log("Doc: " + $(document).width());
//                    console.log("Target: " + targetPosition.x);
//                    console.log("Width: " + itemWidth);
//                    alert("Doc: " + $("body").width() + " Target: " + targetPosition.x + " Width: " + itemWidth);
//                    console.log($("body").width() - targetPosition.x - itemWidth/2 - 20);
                    arrow.css({
                        right:  $("body").width() - targetPosition.x - itemWidth/2 - 20 + "px",
                        left: "auto"
                    });
                }
                else
                {
                    popup.css({
                        left: posx + "px",
                        right: "auto"
                    });

                    arrow.css({
                        left:itemWidth/2 + "px",
                        right: "auto"
                    });
                }

                var bottomOfViewablePage = (window.pageYOffset || document.documentElement.scrollTop) + $(window).height();
                if ((posy + popup.height()) > bottomOfViewablePage)
                {
                    posy = bottomOfViewablePage - popup.height() - 5;
                    popup.mouseover(function()
                    {
                        clearTimeout(hideDelayTimer);
                    }).mouseout(function()
                    {
                        hidePopup();
                    });
                }
                popup.css({
                    top: posy + "px"
                });

                var shadow = $("#content-hover-shadow").appendTo(popup).show();
                // reset position of popup box
                popup.fadeIn(opts.fadeTime, function()
                {
                    // once the animation is complete, set the tracker variables
                    beingShown = false;
                });

                $(contents).css("width", opts.width + "px");

                shadow.css({
                    width: contents.outerWidth() + 32 + "px",
                    height: contents.outerHeight() + 25 + "px"
                });
                $(".b", shadow).css("width", contents.outerWidth() - 26 + "px");
                $(".l, .r", shadow).css("height", contents.outerHeight() - 21 + "px");
            }, opts.showDelay);
        };

        var hidePopup = function(delay)
        {
            delay = (delay == null) ? opts.hideDelay : delay;
            beingShown = false;
            shouldShow = false;
            clearTimeout(hideDelayTimer);
            clearTimeout(showTimer);
            // store the timer so that it can be cleared in the mouseover if required
            hideDelayTimer = setTimeout(function()
            {
                $(items).removeClass("active");
                popup.fadeOut(opts.fadeTime);
            }, delay);
        };

        var contentLoading = false;
        $(items).click(function(e)
        {
            mousePosition = { x: e.pageX, y: e.pageY };
            targetPosition = { x: items.offset().left, y: items.offset().top + 20 };

            if (!beingShown)
            {
                clearTimeout(showTimer);
            }
            shouldShow = true;
            // lazy load popup contents
            if (!contentLoading)
            {
                contentLoading = true;
                contents.load(url, function()
                {
                    contentLoaded = true;
                    postProcess.call({popup: popup, hide: function () { hidePopup(0); }, id: identifier, show: function () { showPopup(); }});
                    showPopup();
                });
            }
            // stops the hide event if we move from the trigger to the popup element
            clearTimeout(hideDelayTimer);
            // don't trigger the animation again if we're being shown
            if (!beingShown)
            {
                showPopup();
            }
            return false;
        }).mouseout(function()
        {
            hidePopup();
        });

        contents.click(function(e)
        {
            e.stopPropagation();
        });

        $("body").click(function()
        {
           hidePopup(0);
        }).mouseover(function()
        {
            hidePopup();
        });

        return popup;
    };

    AJS.InlineDialog.opts = {
        fadeTime: 100,
        hideDelay: 500,
        showDelay: 0,
        width: 200,
        container: "body"
    };

    AJS.toInit(function()
    {
        $("body").append($('<div id="content-hover-shadow"><div class="tl"></div><div class="tr"></div><div class="l"></div><div class="r"></div><div class="bl"></div><div class="br"></div><div class="b"></div></div>'));
        $("#content-hover-shadow").hide();
    });
})(jQuery);

// Confluence specific code

var loadTemplates = function(spaceKey)
{
    AJS.$.getJSON(contextPath + "/plugins/dashboard/getTemplates.action?spaceKey=" + spaceKey,
            function(data)
            {
                    var templateSelect = AJS.$("#templateId");
                    templateSelect.empty();
                    AJS.$.each( data, function (){
                       var option = AJS.$("<option/>").attr("value", this.id).text(this.name).appendTo(templateSelect);
                    });
            });
};


//AJS.toInit(function($)
//{
//    var postProcess = function(id)
//    {
//        var hider = this.hide;
//        $(".cancel-link", this.popup).click(function()
//        {
//            hider();
//            return false;
//        });
//
//        var spaceDropdown = $("#spaceKeyPage");
//        loadTemplates(spaceDropdown.val());
//
//        spaceDropdown.change(function(){
//            loadTemplates($(this).val());
//        });
//
//    };
//
//    AJS.inlineDialog($("#addPageLink"), 1, contextPath + "/plugins/dashboard/addpage.action", postProcess);
//    AJS.inlineDialog($("#addBlogLink"), 2, contextPath + "/plugins/dashboard/addblog.action", postProcess);
//});