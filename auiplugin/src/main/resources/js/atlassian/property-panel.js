(function($) {
    var drawTip = function(parent) {
        var tipParent = $(".aui-tip-parent");
        tipParent = AJS.$('<div class="aui-tip-parent"></div>');

        var top = -5;
        if (AJS.$.browser.msie) { // silly IE if off by a few pixels
           top = (parseInt(AJS.$.browser.version,10) < 8) ? top : -13;
        }
        tipParent.css({
           top: top,
           left: 10
        });
        parent.prepend(tipParent).css({zIndex: 3001});
        var r = Raphael(tipParent[0], 12, 6);
        r.path("M0.001,6.001l6.001-6.001,6.001,6.001").attr({
            fill: "#f0f0f0",
            stroke: "#e2e2e2"
        });
        r.canvas.style.zIndex = 3000;
        tip = r;
        return r;
    };
    /**
     * Draws a shadow relative to parent
     * @param parent the jquery element to draw the panel too
     */
    var drawShadow = function(parent)  {
        var shadowParent = $(".aui-shadow-parent");
        shadowParent = AJS.$('<div class="aui-shadow-parent"></div>').css({
               top: parent.css("top"),
               left: parent.position().left -1, //make sure shadow follows dropdown when alignment changes
               width: parent.width(),
               height: parent.height(),
               position: "absolute",
               zIndex: 2000
           }).insertBefore(parent);
           if (AJS.$.browser.msie) {
               shadowParent.css({right: - 5});
           }
           Raphael.shadow(0, 0, parent.outerWidth(true), parent.outerHeight(true), {
               r: 0.2,
               shadow: "#333",
               size: 0.3,
               stroke: "none",
               color: "none",
               target: shadowParent[0]
           });
           return shadowParent;
    };

    /**
     * Calculates the top and left pixels to locate the property-panel correctly with respect to its anchor element.
     * @param propertyPanel the AJS.Confluence.PropertyPanel to relocate w.r.t. its anchor and panel
     * @param options map of options for the repositioning, including:
     *          - delay : wait {delay} milliseconds before calculating and repositioning
     *          - animate : if true, animate the panel from its current position to the calculated one
     */
    var snapToElement = function (propertyPanel, options) {
        options = options || {};
        setTimeout( function() {
            var offset = $(propertyPanel.anchor).offset(),
                overlap = propertyPanel.panel.width() + offset.left - $(window).width() + 10,
                gapForArrowY = 7,
                gapForArrowX = 0,
                elmHeight = $(propertyPanel.anchor).outerHeight(),
                top = offset.top + elmHeight + gapForArrowY,
                left = offset.left - (overlap > 0 ? overlap : 0) - gapForArrowX;
  
            if (propertyPanel.options.anchorIframe) {
                // The anchor is in an iframe, so the Property Panel should display no lower than the bottom of the iframe.
                var $iframe = $(propertyPanel.options.anchorIframe);
                var iframeBottom = $iframe.offset().top + $iframe.height();
                top = Math.min(top, iframeBottom);
            }
            // position the tip 10 pixels from the left of the anchor
            propertyPanel.panel.find(".aui-tip-parent").css({
                left: Math.abs(offset.left - left) + 10
            });

            var css = {
                top: top ,
                left: left
            };
            var toAnimate = propertyPanel.panel.add(propertyPanel.shadow),
                reduceWidth = function() {
                    propertyPanel.shadow.css("left", propertyPanel.panel.position().left - 1);
                };
            //might move this out to an if statment if this code sticks around
            options.animate ? toAnimate.animate(css, options.animateDuration, reduceWidth) : (function(){ toAnimate.css(css); reduceWidth(); })();

        }, options.delay || 0);
    };

/**
 * Displays a property panel.
 * 
 * @static
 * @class PropertyPanel
 * @namespace AJS
 */
AJS.PropertyPanel = {

    /**
     * Will hold a reference to the current displayed PropertyPanel, if any.
     */
    current: null,
    /**
     * Creates a new PropertyPanel instance with the supplied buttons and attaches it to the supplied element.
     *
     * @param el {Element} the element in the RTE to attach the PropertyPanel to
     * @param buttons {Array} array of objects of the form { html: "", click: function(){} }
     * @param options {Object} map of options for the panel, e.g.
     *      anchorIframe - specifies the iframe that the anchor is inside of
     */
    createFromButtonModel: function (el, buttons, options) {
        var panel = AJS("div").attr({"class": "nowrap"});
        for (var i = 0, ii = buttons.length; i < ii; i++) {
            if (!buttons[i]) continue;

            var button = buttons[i],
                html = button.html || '<span class="icon"></span><span class="panel-button-text">' + (button.text || "") + '</span>',
                classes = [];
            button.className && classes.push(button.className);
            button.disabled && classes.push("disabled");
            button.selected && classes.push("selected");

            !buttons[i + 1] && classes.push("last");
            !buttons[i - 1] && classes.push("first");
            var a = AJS("a").attr({
                href: buttons[i].href || "#",
                "class": classes.join(" ")
            }).html(html);

            buttons[i].tooltip && a.attr("title", buttons[i].tooltip); 

            if (button.disabled) {
                a.attr("title", button.disabledText);
                a.disable();
                a.click(function(e) {
                    return AJS.stopEvent(e);
                });
            } else {
                buttons[i].click && (function(button, a) {
                    a.click(function(e) {
                        //returning the element, makes it a tad easier to create generic handlers
                        button.click($(el));
                        return AJS.stopEvent(e);
                    });
                })(buttons[i], a);
            }

            panel.append(a);
        }
        panel.find(".last:last").css({margin:0});
        return this.create(el, panel, options);
    },

    /**
     * Creates a new PropertyPanel instance with the supplied content and attaches it to the supplied element.
     *
     * @param anchor {Element} the element to anchor the PropertyPanel to
     * @param content {Element} the content to display inside the PropertyPanel
     * @param options {Object} map of options for the panel, e.g.
     *                  anchorIframe - specifies the iframe that the anchor is inside of
     */
    create: function (anchor, content, options) {
        options = options || {};
        var parent = $("#property-panel"), panel;
        parent.length && this.destroy();
    
        parent = AJS("div").addClass("aui-property-panel-parent").attr("id", "property-panel").appendTo("body");
        panel = AJS("div").addClass("aui-property-panel").append(content);

        //as the element needs to have a display block, to calculate the height for rapheal
        //position it top of screen and off stage left so it doesnt flicker.
        parent.append(panel).css({
            top: 0,
            left: -10000
        });
              
        var that = this;
        
        var shadow = drawShadow(parent),
        tip = drawTip(parent);

        this.current = {
            anchor: anchor,
            anchorOffset: AJS.$(anchor).offset(),
            panel: parent,
            isAnchor: function (el) {
                return that.isAnchor(el);
            },
            snapToElement : function (options) {
                snapToElement(this, options);
            },
            shadow: shadow,
            tip: tip,
            options: options,   
            updating: true
        };

        snapToElement(this.current);
        panel = this.current;
        AJS.$(document).bind("keydown.property-panel.escape", function(e) {
            var code = e.keyCode || e.which;
            if (code === 27) { // esc key
                AJS.PropertyPanel.destroy();
            }
        });
        AJS.$(document).bind("click.property-panel",function (e) {
            // If click fired inside active property panel - ignore it
            if (!AJS.$(e.target).closest("#property-panel").length) {
        	        AJS.PropertyPanel.destroy();
        	}
        });

		AJS.trigger("created.property-panel", this.current);
        this.current.updating = false;
        return this.current;
    },
    /**
     * Tears down the current PropertyPanel.
     */
    destroy: function () {
        //if current is bound, then shadow and tip is as well
        if (!this.current) {
            AJS.log("PropertyPanel.destroy: called with no current PropertyPanel, returning");
            return;
        }
        if (this.current.updating) {
            AJS.log("PropertyPanel.destroy: called while updating, returning");
            return;
        }
		AJS.trigger("destroyed.property-panel", this.current);
		AJS.$(document).unbind(".property-panel");
        this.current.panel.remove();
        //shadow does not sit inside the panel
        this.current.shadow.remove();
        this.current = null;
    },
    /**
     * Returns true if the passed element is the RTE anchor element for any current PropertyPanel..
     * @param el {Element} element to check against the current PropertyPanel anchor, if any.
     * @return {boolean} 
     */
    isAnchor: function (el) {
        return this.current && $(this.current.anchor)[0] == $(el)[0];
    }
};
})(AJS.$);
