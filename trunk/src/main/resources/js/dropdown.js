
/*global AJS, document, setTimeout */

AJS.dropDown = function (obj, options) {

    var dd = null,
        result = [],
        $doc = AJS.$(document),
        isAdditionalProperty = function (name) {
            return !((name == "href") || (name == "name") || (name == "className") || (name == "icon"));
        };

    options = options || {};


    if (obj && obj.jquery) { // if AJS.$
        dd = obj;

    } else if (typeof obj == "string") { // if AJS.$ selector
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
                        if (isAdditionalProperty(additionalVar) && !obj[i][j][additionalVar]) {
                            additionalVarsText = additionalVarsText + "<i class='" + additionalVar + "'>" + obj[i][j][additionalVar] + "</i>";
                        }
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
        throw new Error("AJS.dropDown function was called with illegal parameter. Should be AJS.$ object, AJS.$ selector or array.");
    }
    

    
    
    
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
			case 40: {
				cdd.focused++;
				break;
			}
			case 9:
			case 39: {
				return false;
			}
			case 37: {
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
				options.selectionHandler.call(AJS.dropDown.current, e, AJS.$(AJS.dropDown.current.links[cdd.focused]));
				return false;
			}
			default:{
				if (AJS.dropDown.current.links.length) {
					AJS.$(AJS.dropDown.current.links[cdd.focused]).addClass("active");
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
			AJS.$(AJS.dropDown.current.links[cdd.focused]).addClass("active");
        }
        e.stopPropagation();
        e.preventDefault();
        return false;
    };
    var hider = function (e) {
        if (!((e && e.which && (e.which == 3)) || (e && e.button && (e.button == 2)) || false)) { // right click check
            if (AJS.dropDown.current) {
                AJS.dropDown.current.hide("click");
            }
        }
    };
    var active = function (i) {
        return function () {
            if (!AJS.dropDown.current) {
                return;
            }
            AJS.dropDown.current.cleanFocus();
            this.originalClass = this.className;
			AJS.$(this).addClass("active");
            AJS.dropDown.current.$[0].focused = i;
        };
    };
    dd.each(function () {
        var cdd = this, $cdd = AJS.$(this), res;
        var methods = {
			reset: function () {
				res = AJS.$.extend(res || {}, {
					$: $cdd,
	                links: AJS.$(options.item, cdd),
					cleanFocus: function () {
		                if (cdd.focused + 1 && res.links.length) {
							AJS.$(res.links[cdd.focused]).removeClass("active");
		                }
		                cdd.focused = -1;
		            }
				});
		        res.links.each(function (i) {
					AJS.$(this).hover(active(i), res.cleanFocus);
					AJS.$(this).click(function (e) {
						if (AJS.dropDown.current) {
							options.selectionHandler.call(AJS.dropDown.current, e, AJS.$(this));
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
		 * specified method has returned @see AJS.$.aop
		 * @method addCallback
		 * @param {String} methodName - Name of a public method
		 * @param {Function} callback - Function to be executed
		 * @return {Array} weaved aspect
		 */
		res.addCallback = function (method, callback) {
			return AJS.$.aop.after({target: this, method: method}, callback);
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
			if (options.firstSelected && this.links[0]) {
				active(0).call(this.links[0]);
			}
            AJS.$(cdd.offsetParent).css({zIndex: 2000});
        };
        res.hide = function (causer) {
            this.method = this.method || "appear";
            AJS.$($cdd.get(0).offsetParent).css({zIndex: ""});
            this.cleanFocus();
            methods[this.method](false);
            $doc.unbind("click", hider).unbind("keydown", movefocus);
            AJS.dropDown.current = null;
            return causer;
        };
		res.addCallback("reset", function () {
			if (options.firstSelected && this.links[0]) {
				active(0).call(this.links[0]);
			}
		});

		if (!AJS.dropDown.iframes) {
		    AJS.dropDown.iframes = [];
		}
		AJS.dropDown.createShims = function () {       
            AJS.$("iframe").each(function (idx) {
               var iframe = this;        
                if (!iframe.shim) {
                    iframe.shim = AJS.$("<div />")
                                                  .addClass("shim hidden")
                                                  .appendTo("body");            
                    AJS.dropDown.iframes.push(iframe);
                }
            });
		    return arguments.callee;
	    }();
	    
	    res.addCallback("show", function() {        
            AJS.$(AJS.dropDown.iframes).each(function(){                     
                var $this = AJS.$(this); 
                if ($this.is(":visible")) {
                    var offset = $this.offset();
                    offset.height = $this.height();
                    offset.width = $this.width();
                    this.shim.css({
                        left: offset.left + "px",
                        top: offset.top + "px",
                        height: offset.height + "px",
                        width: offset.width + "px"
                    }).removeClass("hidden");
                }
            });
        });
        res.addCallback("hide", function () {
            AJS.$(AJS.dropDown.iframes).each(function(){
                this.shim.addClass("hidden");
            });
        });

        // shadow
        (function () {
            var refreshShadow = function () {

                if (this.$.is(":visible")) {
                    if (!this.shadow) {
                        this.shadow = AJS.$('<div class="aui-shadow"><div class="tl"></div><div class="tr"></div><div class="l"></div><div class="r"></div><div class="bl"></div><div class="br"></div><div class="b"></div></div>').insertBefore(this.$);
                    }
                    if (parseInt(this.$.outerWidth(), 10) > 14) {
                        this.shadow.css({
                            display: "block",
                            top: this.$.css("top"),
                            right: "-7px",
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
    if (spaceNameElement.length === 0) {
        return null;
    } else {
        return spaceNameElement.text();
    }
};

// remove all additional properties
AJS.dropDown.removeAllAdditionalProperties = function (item) {
    AJS.$("i", item).remove();
};

 /**
  * Base dropdown control. Enables you to identify triggers that when clicked, display dropdown.
  *
  * @class Standard
  * @contructor
  * @namespace AJS.dropDown
  * @param {Object} options
  * @return {Object
  */
 AJS.dropDown.Standard = function (usroptions) {

    var res = [], dropdownParents, options = {
        selector: ".aui-dd-parent",
		dropDown: ".aui-dropdown",
		trigger: ".aui-dd-trigger",
		item: "li:has(a)",
        activeClass: "active",
        selectionHandler: function (e, selected) {
            if (selected) {
                if (selected.get(0).nodeName.toLowerCase() !== "a") {
                    window.location = selected.find("a").attr("href");
                } else {
                    window.location = selected.attr("href");
                }
                e.preventDefault();
            }
        }
	};

     // extend defaults with user options
    AJS.$.extend(options, usroptions);

      // handling for jQuery collections
    if (this instanceof AJS.$) {
        dropdownParents = this;
    // handling for selectors
    } else {
        dropdownParents = AJS.$(options.selector);
    }

    // a series of checks to ensure we are dealing with valid dropdowns
    dropdownParents = dropdownParents
            .not(".dd-allocated")
            .filter(":has(" + options.dropDown + ")")
            .filter(":has(" + options.trigger + ")");

    dropdownParents.each(function () {
        var
        $parent = AJS.$(this),
        $dropdown = AJS.$(options.dropDown, this),
        $trigger = AJS.$(options.trigger, this),
        ddcontrol = AJS.dropDown($dropdown, options)[0];

        // extend to control to have any additional properties/methods
        AJS.$.extend(ddcontrol, {trigger: $trigger});

        // flag it to prevent additional dd controls being applied
        $parent.addClass("dd-allocated");

        //hide dropdown if not already hidden
        $dropdown.addClass("hidden");


        $trigger.click(function (e) {
            if (ddcontrol != AJS.dropDown.current) {
                $dropdown.css({top: $trigger.outerHeight()});
                ddcontrol.show();
                e.stopPropagation();
            }
            e.preventDefault();
        });

        ddcontrol.addCallback("show", function () {
           $parent.addClass("active");
        });

        ddcontrol.addCallback("hide", function () {
           $parent.removeClass("active");
        });

        // respect access keys
        if ($trigger.attr("accesskey")) {
            AJS.$(document).keypress(function (e) {
                if (e.ctrlKey && String.fromCharCode(e.charCode) === $trigger.attr("accesskey")) {
                    if (ddcontrol != AJS.dropDown.current) {
                        ddcontrol.show();
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            });
        }

        // add control to the response
        res.push(ddcontrol);

    });
    return res;
};


/**
 * A NewStandard dropdown, however, with the ability to populate its content's via ajax.
 *
 * @class Ajax
 * @contructor
 * @namespace AJS.dropDown
 * @param {Object} options
 * @return {Object} dropDown instance
 */
AJS.dropDown.Ajax = function (usroptions) {

    var dropdowns, options = {cache: true};

     // extend defaults with user options
    AJS.$.extend(options, usroptions || {});

    // we call with "this" in case we are called in the context of a jQuery collection
    dropdowns = AJS.dropDown.Standard.call(this, options);

    AJS.$(dropdowns).each(function () {

        var ddcontrol = this;

        AJS.$.extend(ddcontrol, {
            getAjaxOptions: function (opts) {
                var success = function (response) {
                    if (options.formatResults) {
                        response = options.formatResults(response);
                    }
                    if (options.cache) {
                        ddcontrol.cache.set(ddcontrol.getAjaxOptions(), response);
                    }
                    ddcontrol.refreshSuccess(response);
                };
                if (options.ajaxOptions) {


                    if (AJS.$.isFunction(options.ajaxOptions)) {
                        return AJS.$.extend(options.ajaxOptions.call(ddcontrol), {success: success});
                    } else {
                        return AJS.$.extend(options.ajaxOptions, {success: success});
                    }
                }
                return AJS.$.extend(opts, {success: success});
            },
            refreshSuccess: function (response) {
                this.$.html(response);
            },
            cache: function () {
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
            }(),
            show: function (superMethod) {
                return function (opts) {
                    if (options.cache && !!ddcontrol.cache.get(ddcontrol.getAjaxOptions())) {
                        ddcontrol.refreshSuccess(ddcontrol.cache.get(ddcontrol.getAjaxOptions()));
                        superMethod.call(ddcontrol);
                    } else {
                        AJS.$(AJS.$.ajax(ddcontrol.getAjaxOptions())).throbber({target: ddcontrol.$,
                            end: function () {
                                ddcontrol.reset();
                            }
                        });
                        superMethod.call(ddcontrol);
                        ddcontrol.shadow.hide();
                    }
                };
            }(ddcontrol.show),
            resetCache: function () {
                ddcontrol.cache.reset();
            }
        });
        ddcontrol.addCallback("refreshSuccess", function () {
			ddcontrol.reset();
		});
    });
    return dropdowns;
};


AJS.$.fn.dropDown = function (type, options) {
    type = (type || "Standard").replace(/^([a-z])/, function (match) {
        return match.toUpperCase();
    });
    return AJS.dropDown[type].call(this, options);
};

