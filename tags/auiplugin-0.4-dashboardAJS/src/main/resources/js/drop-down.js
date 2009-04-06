AJS.dropDown = function (obj, options) {
    var dd = null,
        result = [],
        $doc = AJS.$(document),
        isAdditionalProperty = function (name) {
            return !((name == "href") || (name == "name") || (name == "className") || (name == "icon"));
        };

    options = options || {};

    if (obj && obj.jquery) { // if jQuery
        dd = obj;
    } else if (typeof obj == "string") { // if jQuery selector
        dd = AJS.$(obj);
    } else if (obj && obj.constructor == Array) { // if JSON
        dd = AJS("ul").attr("class", (options.isVisibleByDefault ? "hidden" : "") + "ajs-drop-down");
        for (var i = 0, ii = obj.length; i < ii; i++) {
            var ol = AJS("ol");
            for (var j = 0, jj = obj[i].length; j < jj; j++) {
                var li = AJS("li");
                if (obj[i][j].href) {
                    // any additional attributes (beyond those expected) on the JSON objects will be added as
                    // i elements with a class name matching their attribute name
                    var additionalVarsText = "";
                    for (var additionalVar in obj[i][j]) {
                        if (isAdditionalProperty(additionalVar) && obj[i][j][additionalVar] != null)
                            additionalVarsText = additionalVarsText + "<i class='" + additionalVar + "'>" + obj[i][j][additionalVar] + "</i>";
                    }

                    li.append(AJS("a")
                        .html("<span>" + obj[i][j].name + additionalVarsText + "</span>")
                        .attr({href:  obj[i][j].href})
                        .addClass(obj[i][j].className));
                } else {
                    li.html(obj[i][j].html).addClass(obj[i][j].className);
                }
                if (obj[i][j].icon) {
                    li.prepend(AJS("img").attr("src", obj[i][j].icon));
                }
                ol.append(li);
            }
            if (i == ii - 1) {
                ol.addClass("last");
            }
            dd.append(ol);
        }
        AJS.$("body").append(dd);
    } else {
        throw new Error("AJS.dropDown function was called with illegal parameter. Should be jQuery object, jQuery selector or array.");
    }
    AJS.dropDown.createShims = function () {
        var shims = $(".shim");
        jQuery("iframe").each(function(idx){
            var $this = jQuery(this);
            var offset = $this.offset();
            offset.height = $this.height();
            offset.width = $this.width();
            jQuery(shims[idx]).css({
                position: "absolute",
                left: offset.left + "px",
                top: offset.top + "px",
                height: offset.height + "px",
                width: offset.width + "px"
            });
        });
    };
    //shim for iframes
    var iframes = $("iframe"), loadedIframes = 0, reset = function () {};

    iframes.each(function () {
        this.shim = AJS("div").addClass("shim").appendTo("body");
        $(this).load(function () {
            var oldreset = reset;
            reset = function () {
                oldreset();
                AJS.dropDown.createShims();
            };
            if (++loadedIframes == iframes.length) {
                reset();
            }
        });
    });

    var shims = $(".shim");

    var tabToDD = function (dir) {
		if (options.tabbed && result.length > 1) {
			var activeIdx = AJS.indexOf(result, AJS.dropDown.current) + dir;
			if (activeIdx === result.length) {
				activeIdx = 0;
			} else if (activeIdx === -1) {
				activeIdx = result.length - 1;
			}
			AJS.dropDown.current.hide("escape");
			result[activeIdx].show();
		} else {
			AJS.dropDown.current.hide("escape");
		}
	};

    var movefocus = function (e) {
        if (!AJS.dropDown.current) {
            return true;
        }
        var c = e.which,
            cdd = AJS.dropDown.current.$[0],
            focus = (typeof cdd.focused == "number" ? cdd.focused : -1);
			AJS.dropDown.current.cleanFocus();
       		cdd.focused = focus;

        switch (c) {
			case 40:{
				cdd.focused++;
				break;
			}
			case 9:
			case 39: {
				tabToDD(1);
				return false;
			}
			case 37: {
				tabToDD(-1);
				return false;
			}
			case 38:{
				cdd.focused--;
				break;
			}
			case 27:{
				AJS.dropDown.current.hide("escape");
				return false;
			}
			case 13:{
				options.selectionHandler.call(AJS.dropDown.current, jQuery(AJS.dropDown.current.links[cdd.focused]));
				return false;
			}
			default:{
				if (AJS.dropDown.current.links.length) {
					jQuery(AJS.dropDown.current.links[cdd.focused]).addClass("active");
				}
				return true;
			}
		}
        if (cdd.focused < 0) {
            cdd.focused = AJS.dropDown.current.links.length - 1;
        }
        if (cdd.focused > AJS.dropDown.current.links.length - 1) {
            cdd.focused = 0;
        }
        if (AJS.dropDown.current.links.length) {
			jQuery(AJS.dropDown.current.links[cdd.focused]).addClass("active");
        }
        e.stopPropagation();
        e.preventDefault();
        return false;
    };
    var hider = function (e) {
        if (!((e && e.which && (e.which == 3)) || (e && e.button && (e.button == 2)) || false)) { // right click check
            AJS.dropDown.current && AJS.dropDown.current.hide("click");
        }
    };
    var active = function (i) {
        return function () {
            AJS.dropDown.current.cleanFocus();
            this.originalClass = this.className;
			$(this).addClass("active");
            AJS.dropDown.current.$[0].focused = i;
        };
    };
    dd.each(function () {
        var cdd = this, $cdd = AJS.$(this), res;
        var methods = {
			reset: function () {
				res = jQuery.extend(res || {}, {
					$: $cdd,
	                links: AJS.$(options.items, cdd),
					cleanFocus: function () {
		                if (cdd.focused + 1 && res.links.length) {
							$(res.links[cdd.focused]).removeClass("active");
		                }
		                cdd.focused = -1;
		            }
				});
		        res.links.each(function(i){
					$(this).hover(active(i), res.cleanFocus);
					$(this).click(function(e){
						if (AJS.dropDown.current) {
							options.selectionHandler.call(AJS.dropDown.current, $(this));
						}
					});
				});
				return arguments.callee;
			}(),
            appear: function (dir) {
                if (dir) {
                    $cdd.removeClass("hidden");
                } else {
                    $cdd.addClass("hidden");
                }
            },
            fade: function (dir) {
                if (dir) {
                    $cdd.fadeIn("fast");
                } else {
                    $cdd.fadeOut("fast");
                }
            },
            scroll: function (dir) {
                if (dir) {
                    $cdd.slideDown("fast");
                } else {
                    $cdd.slideUp("fast");
                }
            }
        };

        /**
		 * Uses Aspect Oriented Programming (AOP) to insert callback <em>after</em> the
		 * specified method has returned @see jQuery.aop
		 * @method addCallback
		 * @param {String} methodName - Name of a public method
		 * @param {Function} callback - Function to be executed
		 * @return {Array} weaved aspect
		 */
		res.addCallback = function (method, callback) {
			return jQuery.aop.after({target: this, method: method}, callback);
		};

		res.reset = methods.reset();

        res.show = function (method) {
            hider();
            AJS.dropDown.current = this;
            this.method = method || this.method || "appear";
            methods[this.method](true);
            this.timer = setTimeout(function () {
                $doc.click(hider);
            }, 0);
            $doc.keydown(movefocus);
            shims && shims.removeClass("hidden");
			if (options.firstSelected && this.links[0]) {
				active(0).call(this.links[0]);
			}
            $(cdd.offsetParent).css({zIndex: 2000});
        };
        res.hide = function (causer) {
            this.method = this.method || "appear";
            $($cdd.get(0).offsetParent).css({zIndex: ""});
            this.cleanFocus();
            methods[this.method](false);
            $doc.unbind("click", hider).unbind("keydown", movefocus);
            AJS.dropDown.current = null;
            shims && shims.addClass("hidden");
            return causer;
        };
        if ($cdd.hasClass("hidden")) {
            res.hide();
        } else {
            res.show(); 
        }
		res.addCallback("reset", function() {
			if (options.firstSelected && this.links[0]) {
				active(0).call(this.links[0]);
			}
		});
        // shadow
        (function () {
            var refreshShadow = function () {
                var alignCSS = {}, ddLeft, ddRight;
                if (this.$.is(":visible")) {
                    if (!this.shadow) {
                        this.shadow = $('<div class="aui-shadow"><div class="tl"></div><div class="tr"></div><div class="l"></div><div class="r"></div><div class="bl"></div><div class="br"></div><div class="b"></div></div>').insertBefore(this.$);
                    }
                    if (parseInt(this.$.outerWidth(), 10) > 14) {
                        if (options.align) {
                             if (options.align === "right") {
                                 alignCSS.right = -7;
                                 alignCSS.left = "auto";
                             } else {
                                 alignCSS.right = "auto";
                                 alignCSS.left = -7;
                             }
                        } else {
                            ddLeft = res.$.css("left");
                            ddRight = res.$.css("right");
                            alignCSS.left = ddLeft === "auto" ? "auto" : parseInt(ddLeft, 10) - 7;
                            alignCSS.right = right = ddRight === "auto" ? "auto" : parseInt(ddRight, 10) - 7;
                        }
                        this.shadow.css({
                            display: "block",
                            left: alignCSS.left,
                            top: this.$.css("top"),
                            right: alignCSS.right,
                            width: this.$.outerWidth() + 14 + "px",
                            height: this.$.outerHeight() + 14 + "px"
                        })
                        .find(".b").css("width", this.$.outerWidth() - 14 + "px");
                        this.shadow.find(".l, .r").css("height", this.$.outerHeight() - 8 + "px");
                    }
                }
            };
            res.addCallback("reset", refreshShadow);
            res.addCallback("show", refreshShadow);
            res.addCallback("hide", function () {
                if (this.shadow) {
                    this.shadow.css({display: "none"});
                }
            });
        })();
        result.push(res);
    });
    return result;
};

// for each item in the drop down get the value of the named additional property. If there is no
// property with the specified name then null will be returned.
AJS.dropDown.getAdditionalPropertyValue = function (item, name) {
    var spaceNameElement = AJS.$("i." + name, item);
    if (spaceNameElement.length == 0) {
        return null;
    } else {
        return spaceNameElement.text();
    }
};

// remove all additional properties
AJS.dropDown.removeAllAdditionalProperties = function(item) {
    AJS.$("i", item).remove();
};


 /**
  * Base dropdown control. Enables you to identify triggers that when clicked, display dropdown.
  *
  * @class Standard
  * @contructor
  * @namespace AJS.dropDown
  * @param {Object} options
  * @... {String, Object} dropDown - dropdown element/s. This can be passed as a jQuery selector or jQuery collection.
  * @... {String, Object} trigger - trigger element/s. This can be passed as a jQuery selector or jQuery collection.
  * @... {String, Object} activeClass - Class name that is applied to focused elements. Useful for css styling.
  * @... {String, Object} items - list items, items that you want keyboard navigation applied to.  This can be passed
  * as a jQuery selector or jQuery collection.
  * @.. {Function} selectionHandler - function that is called when an item is selected. Passed the selected item as first argument.
  @ @.. {String} align - Specify what alignment the dropdown should be, "left or right"
  * @return {Object
  */
 AJS.dropDown.Standard = function (options) {
 	var dropdowns, triggers, defaults = {
		dropDown: ".aui-dropdown",
		trigger: ".aui-dd-link",
		activeClass: "active",
		items: "li",
		selectionHandler: function (e, selected) {
			window.location = selected.find("a").attr("href");
			this.hide();
			e.preventDefault();
			e.stopPropagation();
		}
	};
	options = jQuery.extend(defaults, options);
    dropdowns = AJS.dropDown(options.dropDown, options);  
	if (options.trigger) {
        triggers = AJS.$(options.trigger);
        $(dropdowns).each(function(i){
            var cdd = this, trigger;
            cdd.$.addClass("hidden").css(function(){
                 if (options.align) {
                     if (options.align === "right") {
                         return {right: 0, left: "auto"};              
                     } else {
                         return {right: "auto", left: 0};  
                     }
                }
            }());
            trigger = jQuery(triggers[i]);
            this.trigger = trigger;
            trigger.click(function(e){
                if (cdd != AJS.dropDown.current) {
                    cdd.show();
				}
				else {
					cdd.hide();
				}
				e.stopPropagation();
				e.preventDefault();
			});
			cdd.addCallback("show", function(trigger){
				return function(){
					trigger.addClass(options.activeClass);
					if (cdd.$.css("top") === "auto" || cdd.$.css("top") === "0px") {
						cdd.$.css({top: trigger.outerHeight()});
                        if (cdd.shadow) {
                            cdd.shadow.css({top: cdd.$.css("top")});
                        }
                    }
				};
			}(trigger));
			cdd.addCallback("hide", function(trigger){
				return function(){
					trigger.removeClass(options.activeClass).blur();
				};
			}(trigger));
            if (trigger.attr("accesskey")) {
                jQuery(document).keypress(function(e){
                    if (e.ctrlKey && String.fromCharCode(e.charCode) === trigger.attr("accesskey")) {
                        if (cdd != AJS.dropDown.current) {
                            cdd.show();
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                });
            }
        });
	}
    return dropdowns;
 };


/**
 * A standard dropdown, however, with the ability to populate its content's via ajax.
 *
 * @class Ajax
 * @contructor
 * @namespace AJS.dropDown
 * @param {Object} options
 * @... {HTMLelement} dropDown
 * @return {Object} dropDown instance
 */
AJS.dropDown.Ajax = function (options) {
    var dropdowns, defaults = {trigger: false};
	dropdowns = AJS.dropDown.Standard(jQuery.extend(defaults, options));
	jQuery(dropdowns).each(function (){
		jQuery.extend(this, {
			refreshSuccess: function (response) {
                this.$.html(response);
			}
		});
        if (options.cache) {
            var cache = function (){
                var c = {};
                return {
                    get: function (ajaxOptions) {
                        var data = ajaxOptions.data || "";
                        return c[(ajaxOptions.url + data).replace(/[\?\&]/gi,"")];
                    },
                    set: function (ajaxOptions, responseData) {
                        var data = ajaxOptions.data || "";
                        c[(ajaxOptions.url + data).replace(/[\?\&]/gi,"")] = responseData;
                    },
                    reset: function () {
                        c = {};
                    }
                };
            }();
        }
        this.show = function(superMethod) {
			
			return function(opts){
				var that = this;
				this.show.options = function (){
                    if (options.ajaxOptions) {
                        if(jQuery.isFunction(options.ajaxOptions)) {
                            return options.ajaxOptions.call(that);
                        } else {
                            return options.ajaxOptions;
                        }
                    }
                    return opts;
                }();
				this.show.options = jQuery.extend({
					success: function(response){
                        if (options.formatResults) {
							response = options.formatResults(response);
						}

						if (options.cache) {
							cache.set(that.show.options, response);
						}
						that.refreshSuccess(response);
					}
				}, this.show.options);
				if (options.cache && !!cache.get(this.show.options)) {
					that.refreshSuccess(cache.get(this.show.options));
                    superMethod.call(this);
                } else {
                    jQuery(jQuery.ajax(this.show.options)).throbber({target: this.$,
                        end: function () {
                            that.reset();
                        }
                    });
                    superMethod.call(this);
                    this.shadow.hide();
                }
            };
		}(this.show);
        this.resetCache = function () {
            cache.reset();
        };
        this.addCallback("refreshSuccess", function () {
			this.reset();
		});
	});
	return dropdowns;
};
