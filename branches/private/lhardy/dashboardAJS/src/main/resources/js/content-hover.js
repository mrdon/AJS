(function($) {
    /**
     * Creates a new hover popup
     *
     * @param items jQuery object - the items that trigger the display of this popup when the user mouses over.
     * @param identifier A unique identifier for this popup. This should be unique across all popups on the page and a valid CSS class.
     * @param displayData The URL to retrieve popup contents, or a function that takes in the content div, and displays the data there. todo: doco each param.
     * @param postProcess A function called after the popup contents are loaded.
     *                    `this` will be the popup jQuery object, and the first argument is the popup identifier.
     * @param options Custom options to change default behaviour. See AJS.contentHover.opts for default values and valid options.
     *
     * @return jQuery object - the popup that was created
     */
    AJS.contentHover = function(items, identifier, displayData, postProcess, options) {
        var opts = $.extend(AJS.contentHover.opts, options);
        var hideDelayTimer;
        var showTimer;
        var beingShown = false;
        var shouldShow = false;
        var contentLoaded = false;
        var mousePosition;
        identifier = identifier?'id="content-hover-' + identifier + '"' : "";
        var popup = $('<div '+identifier+' class="ajs-content-hover"><div class="contents"></div></div>');
        $(opts.container).append(popup);
        var contents = $(".contents", popup);

        contents.mouseover(function() {
            clearTimeout(hideDelayTimer);
            popup.unbind("mouseover");
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
                beingShown = true;
                var posx = mousePosition.x - 3;
                var posy = mousePosition.y + 15;

                if (posx + opts.width + 30 > $(window).width()) {
                    popup.css({
                        right: "10px",
                        left: "auto"
                    });
                }
                else {
                    popup.css({
                        left: posx + "px",
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

                var shadow = $("#content-hover-shadow").appendTo(popup).show();
                // reset position of popup box
                popup.fadeIn(opts.fadeTime, function() {
                    // once the animation is complete, set the tracker variables
                    beingShown = false;
                });

                shadow.css({
                    width: contents.outerWidth() + 32 + "px",
                    height: contents.outerHeight() + 25 + "px"
                });
                $(".b", shadow).css("width", contents.outerWidth() - 26 + "px");
                $(".l, .r", shadow).css("height", contents.outerHeight() - 21 + "px");
            }, opts.showDelay);
        };

        var hidePopup = function() {
            beingShown = false;
            shouldShow = false;
            if($.isFunction(displayData)) {
                contentLoading = false;
                contentLoaded = false;
            }
            clearTimeout(hideDelayTimer);
            clearTimeout(showTimer);
            // store the timer so that it can be cleared in the mouseover if required
            hideDelayTimer = setTimeout(function() {
                popup.fadeOut(opts.fadeTime);
            }, opts.hideDelay);
        };

        var contentLoading = false;
        $(items).mousemove(function(e) {
            mousePosition = { x: e.pageX, y: e.pageY };
            if (!beingShown) {
                clearTimeout(showTimer);
            }
            shouldShow = true;
            var doShowPopup = function() {
                contentLoaded = true;
                if (postProcess) {
                    postProcess.call(popup, identifier);
                }
                showPopup();
            };
            // lazy load popup contents
            if (!contentLoading) {
                contentLoading = true;
                if ($.isFunction(displayData)) {
                    displayData(contents, this, doShowPopup);
                } else {
                    contents.load(displayData, doShowPopup);
                }
            }
            // stops the hide event if we move from the trigger to the popup element
            clearTimeout(hideDelayTimer);
            // don't trigger the animation again if we're being shown
            if (!beingShown) {
                showPopup();
            }
        }).mouseout(function() {
            hidePopup();
        });

        contents.click(function(e) {
//For now, to prevent this from inteferring with jquery live events
//            e.stopPropagation();
        });
//For now, to prevent this from inteferring with jquery live events
//        $("body").click(function() {
//            beingShown = false;
//            clearTimeout(hideDelayTimer);
//            clearTimeout(showTimer);
//            popup.hide();
//        });

        return popup;
    };

    AJS.contentHover.opts = {
        fadeTime: 100,
        hideDelay: 500,
        showDelay: 700,
        width: 300,
        container: "body"
    };

    AJS.toInit(function(){
        $("body").append($('<div id="content-hover-shadow"><div class="tl"></div><div class="tr"></div><div class="l"></div><div class="r"></div><div class="bl"></div><div class="br"></div><div class="b"></div></div>'));
        $("#content-hover-shadow").hide();
    });
})(AJS.$);


// Confluence specific code
//
//AJS.toInit(function($) {
//    var postProcess  = function(id) {
//        // var username = users[id];
//        // $(".ajs-menu-bar", this).ajsMenu();
//        // $(".favourite-icon, .unfavourite-icon", this).each(function() {
//        //     var $this = $(this).click(function(e) {
//        //         if ($this.hasClass("waiting")) {
//        //             return;
//        //         }
//        //         var url = $this.hasClass("unfavourite-icon") ? "/removeprofilefromfavourites.action" : "/addprofiletofavourites.action";
//        //         $this.addClass("waiting");
//        //         $.get(contextPath + url, { username: username }, function() {
//        //             $this.removeClass("waiting").toggleClass("favourite-icon").toggleClass("unfavourite-icon");
//        //         });
//        //         return AJS.stopEvent(e);
//        //     });
//        // });
//    };
//
//    var users = [];
//    $(".hover-userlink, .hover-userlogo").each(function() {
//        var userlink = $(this);
//        var matched = "hover-userlink";
//        if (matched == null) {
//            return;
//        }
//        var username = matched[1];
//        userlink.attr("title", "");
//        $("img", userlink).attr("title", "");
//        var arrayIndex = $.inArray(username, users);
//        if (arrayIndex == -1) {
//            users.push(username);
//            arrayIndex = $.inArray(username, users);
//        }
//
//        $(this).addClass("userlink-" + arrayIndex);
//    });
//
//    $.each(users, function(i) {
////        AJS.contentHover($(".userlink-" + i), i, contextPath + "/users/userinfopopup.action?username=" + users[i], postProcess);
//        AJS.contentHover($(".userlink-" + i), i, "http://twalve.sydney.atlassian.com/bleh/fisheye/static/2/userhover.php", postProcess);
//    });
//});

/* EXPECTED EXAMPLE CODE RETURNED

<div class="profile-macro">
	<div class="vcard">
		<a class="userLogoLink" href="https://extranet.atlassian.com/crucible/committer/FE/bhumphreys"><img style="width:32px;height:32px;" class="userLogo logo" src="http://www.gravatar.com/avatar/93003ed6cd4da049cd1b85948c919b08?d=monsterid&amp;s=32" alt="" title="dtaylor"></a>
		<h4><a class="" href="https://extranet.atlassian.com/crucible/committer/FE/bhumphreys">Brendan Humphreys</a></h4>
		<a href="mailto:bhumphreys@atlassian.com" title="Send Email to Brendan Humphreys" class="email">bhumphreys@atlassian.com</a>
		<span class="user-status">ÒSome pithy quote or DJOTDÓ</span>
	</div>
</div>

<div class="actions">
	<ul class="ajs-menu-bar">
		<li class="popup-favourite ajs-button ajs-menu-item">
			<a class="popup-icon favourite-icon" title="Add David Taylor to Favourites" href="/addprofiletofavourites.action?username=dtaylor"><span>Favourite</span></a>
		</li>
		<li class="normal ajs-menu-item">
			<a id="user-popup-menu-dtaylor" class="user-popup-more trigger ajs-menu-title" href="#"><span><span>More</span></span></a>
		 	<div style="" class="ajs-drop-down hidden">
				<ul id="user-popup-menu-dtaylor-secondary" class="section-secondary first">
					<li><a href="/display/%7Edtaylor" class="personal-space-link"><span>Personal Space</span></a></li>
					<li><a href="/users/viewuserprofile.action?username=dtaylor" class="user-profile-link"><span>Profile</span></a></li>
					<li><a href="/users/viewfavouritepeople.action?username=dtaylor" class="favourite-people-link"><span>Favourite People</span></a></li>
				</ul>
			</div>
		</li>
	</ul>
</div>

*/
