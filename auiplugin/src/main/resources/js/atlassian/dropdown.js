/**
 * Displays a drop down, typically used for menus.
 * 
 * @class dropDown
 * @namespace AJS
 * @constructor
 * @param obj {jQuery Object|String|Array} object to populate the drop down from.
 * @param usroptions optional dropdown configuration. Supported properties are:
 * <li>alignment - "left" or "right" alignment of the drop down</li>
 * <li>escapeHandler - function to handle on escape key presses</li>
 * <li>activeClass - class name to be added to drop down items when 'active' ie. hover over</li>
 * <li>selectionHandler - function to handle when drop down items are selected on</li>
 * <li>hideHandler - function to handle when the drop down is hidden</li>
 * When an object of type Array is passed in, you can also configure:
 * <li>isHiddenByDefault - set to true if you would like to hide the drop down on initialisation</li>
 * <li>displayHandler - function to display text in the drop down</li>
 * @return {Array} an array of jQuery objects, referring to the drop down container elements
 */
 
AJS.dropDown = function (obj, usroptions) {
    init: function (options) {

                    // deprecated - use the properties on the li, not the span
                    AJS.$.data(AJS.$("a > span", li)[0], "properties", properties);
                } else {
                    li.html(properties.html).addClass(properties.className);
                }
                if (properties.icon) {
                    li.prepend(AJS("img").attr("src", properties.icon));
                }
                if (properties.insideSpanIcon){
                    li.children("a").prepend(AJS("span").attr("class","icon"));
                }

                AJS.$.data(li[0], "properties", properties);
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

        this.options = AJS.$.extend(this._getDefaultOptions(options), options);
        this.$content = AJS.$(this.options.content);
        this.$layer = this._render("layer").insertBefore(this.$content);
        this.$content.appendTo(this.$layer);
        this._assignEvents("container", document);
        this._assignEvents("layer", this.$layer);
        this._assignEvents("win", window);

        if (this._supportsBoxShadow()) {
            this.$layer.addClass("box-shadow");
        }
    },

    hide: function () {

        if (!this.$content.is(":visible")) {
            return;
        }

        this.$scrollableContainer.unbind("scroll.hide-dropdown");
        this.$layer.removeClass("active").hide();
        
        // we need to put it back so that it is cleared when say dialog content is emptied
        if (this.$offsetTarget) {
            this.$layer.appendTo(this.$placeholder);
        }
        this._resetZIndexes();
        AJS.Dropdown.current = null;
    },

    show: function () {

        if (this.$content.is(":visible")) {
            return;
        }
        if (AJS.Dropdown.current) {
            AJS.Dropdown.current.hide();
        }

        // need to do this here because when we initialise the dropdown, the dropdown content may not be in the DOM
        if (!this.$offsetTarget) {
            this.$offsetTarget = this.$layer.prev();
            this.$placeholder = AJS.$("<div class='ajs-layer-placeholder' />").insertAfter(this.$offsetTarget);
            this.$scrollableContainer = this.$offsetTarget.closest(".content-body");
            this.$layer.appendTo("body");
        } else {
            this.$layer.appendTo("body");
        }

    dd.each(function () {
        var cdd = this, $cdd = AJS.$(this), res;
        var methods = {
            reset: function () {
                res = AJS.$.extend(res || {}, {
                    $: $cdd,
                    links: AJS.$(options.item || "li:has(a)", cdd),
                    cleanActive: function () {
                        if (cdd.focused + 1 && res.links.length) {
                            AJS.$(res.links[cdd.focused]).removeClass(options.activeClass);
                        }
                    },
                    cleanFocus: function () {
                        res.cleanActive();
                        cdd.focused = -1;
                    },
                    moveDown: moveDown,
                    moveUp: moveUp,
                    moveFocus: moveFocus,
                    getFocusIndex: function () {
                        return (typeof cdd.focused == "number") ? cdd.focused : -1;
                    }
                });
                res.links.each(function (i) {
                    var $this = AJS.$(this);
                    if (!isEventsBound($this)) {
                        $this.hover(active(i), res.cleanFocus);
                        $this.click(handleClickSelection);
                    }
                });
                return arguments.callee;
            }(),
            appear: function (dir) {
                if (dir) {
                    $cdd.removeClass("hidden");
                    //handle left or right alignment
                    $cdd.addClass("aui-dropdown-" + options.alignment);
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

        this.$layer.addClass("active").show();
        this._setZindexes();
        this.setHeight();
        this.setWidth();
        this.setPosition();

        res.reset = methods.reset();
        res.show = function (method) {
            this.alignment = options.alignment;
            hider();
            AJS.dropDown.current = this;
            this.method = method || this.method || "appear";
            this.timer = setTimeout(function () {
                $doc.click(hider);
            }, 0);

            $doc.keydown(moveFocus);
            if (options.firstSelected && this.links[0]) {
                active(0).call(this.links[0]);
            }
            AJS.$(cdd.offsetParent).css({zIndex: 2000});
            methods[this.method](true);
			AJS.$(document).trigger("showLayer", ["dropdown", AJS.dropDown.current]);
        };
        res.hide = function (causer) {
            this.method = this.method || "appear";
            AJS.$($cdd.get(0).offsetParent).css({zIndex: ""});
            this.cleanFocus();
            methods[this.method](false);
            $doc.unbind("click", hider).unbind("keydown", moveFocus);
			AJS.$(document).trigger("hideLayer", ["dropdown", AJS.dropDown.current]);
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
                   options.hideHandler();
               });

        //shadow
       (function () {
           var refreshShadow = function () {
               var offset = this.$.offset();
               if(this.shadow) {
                   this.shadow.remove();
               }
               if (this.$.is(":visible")) {
                   this.shadow = Raphael.shadow(0, 0, this.$.outerWidth(true), this.$.outerHeight(true), {
                       target: this.$[0]
                   });
                   this.shadow.css("top",this.$.css("top"));
                   if(this.alignment == "right") {
                        this.shadow.css("left","");
                   }
                   else {
                       this.shadow.css("left","0px");
                   }
               }
           };
           res.addCallback("reset", refreshShadow);
           res.addCallback("show", refreshShadow);
           res.addCallback("hide", function () {
               if (this.shadow) {
                   this.shadow.remove();
               }
           });
       })();
        
       // shim to sit over flash and select boxes
      if (AJS.$.browser.msie) {
          (function () {
              var refreshIframeShim = function () {
                  if (this.$.is(":visible")) {
                      if (!this.iframeShim) {
                          this.iframeShim = AJS.$('<iframe class="dropdown-shim" src="javascript:false;" frameBorder="0" />').insertBefore(this.$);
                      }
                      this.iframeShim.css({
                          display: "block",
                          top: this.$.css("top"),
                          width: this.$.outerWidth() + "px",
                          height: this.$.outerHeight() + "px"
                      });
                      if(options.alignment=="left"){
                          this.iframeShim.css({left:"0px"});
                      } else {
                          this.iframeShim.css({right:"0px"});
                      }
                  }
              };
              res.addCallback("reset", refreshIframeShim);
              res.addCallback("show", refreshIframeShim);
              res.addCallback("hide", function () {
                  if (this.iframeShim) {
                      this.iframeShim.css({display: "none"});
                  }
              });
          })();
      }

        var offset = this.$offsetTarget.offset();
        var newOffsetTop = offset.top + this.$offsetTarget.outerHeight();
        var cushion = 20;
        var scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        var maxHeight = AJS.$(window).height() + scrollTop - newOffsetTop - cushion;

        this.$layer.css({
            left: offset.left,
            top: newOffsetTop,
            maxHeight: maxHeight
        });
    },

    setWidth: function (minWidth) {

        var availableWidth = AJS.$(window).width() - this.$content.offset().left;

        minWidth = Math.max(minWidth || 200, this.$offsetTarget.outerWidth());

    var hookUpDropDown = function($trigger, $parent, $dropdown, ddcontrol) {
    _events: {
        container : {
            keydown: function (e) {
                if (e.keyCode === AJS.$.ui.keyCode.ESCAPE) {
                    this.hide();
                }   
            },
            click: function (e) {
                if (e.button !== 2) {
                    this.hide();
                }
            }
        },

        win: {
            resize: function () {
                if (!this.$offsetTarget || !this.$layer.is(":visible")) {
                    return;
                }
                this.setPosition();
                this.setHeight();
                this.setWidth();
            }
        },

        //hide dropdown if not already hidden
        $dropdown.addClass("hidden");

        //show the dropdown if isHiddenByDefault is set to false
        if (options.isHiddenByDefault == false) {
            ddcontrol.show();
        }

        ddcontrol.addCallback("show", function () {
                $parent.addClass("active");
             });
        
             ddcontrol.addCallback("hide", function () {
                $parent.removeClass("active");
             });
    };

    var handleEvent = function(event, $trigger, $dropdown, ddcontrol) {
        if (ddcontrol != AJS.dropDown.current) {
            $dropdown.css({top: $trigger.outerHeight()});
            ddcontrol.show();
            event.stopImmediatePropagation();
        }
        event.preventDefault();
    };

    if (options.useLiveEvents) {
        // cache arrays so that we don't have to recalculate the dropdowns. Since we can't store objects as keys in a map,
        // we have two arrays: keysCache stores keys of dropdown triggers; valuesCache stores a map of internally used objects
        var keysCache = [];
        var valuesCache = [];

        AJS.$(options.trigger).live("click", function (event) {
            var $trigger = AJS.$(this);
            var $parent, $dropdown, ddcontrol;

            // if we're cached, don't recalculate the dropdown and do all that funny shite.
            var index;
            if ((index = AJS.$.inArray(this, keysCache)) >= 0) {
                var val = valuesCache[index];
                $parent = val['parent'];
                $dropdown = val['dropdown'];
                ddcontrol = val['ddcontrol'];
            } else {
                $parent = $trigger.closest(options.selector);
                $dropdown = $parent.find(options.dropDown);
                // Sanity checking
                if ($dropdown.length === 0) {
                    return;
                }

                ddcontrol =  AJS.dropDown($dropdown, options)[0];
                // Sanity checking
                if (!ddcontrol) {
                    return;
                }

                // cache
                keysCache.push(this);
                val = {
                    parent : $parent,
                    dropdown : $dropdown,
                    ddcontrol : ddcontrol
                };

                hookUpDropDown($trigger, $parent, $dropdown, ddcontrol);

                valuesCache.push(val);
            }

            handleEvent(event, $trigger, $dropdown, ddcontrol);
        });
    } else {
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

            hookUpDropDown($trigger, $parent, $dropdown, ddcontrol);

            $trigger.click(function (e) {
                handleEvent(e, $trigger, $dropdown, ddcontrol);
            });

            // add control to the response
            res.push(ddcontrol);

        });
    }
    return res;
};

            this.undoZIndexes = function (undoZIndexes, offsetElement) {
                return function () {
                    offsetElement.css("zIndex", "");
                    if (undoZIndexes) {
                        undoZIndexes();
                    }
                };
            }(this.undoZIndexes, AJS.$(offsetElement));

            AJS.$(offsetElement).css("zIndex", topIndex);
            offsetElement = offsetElement.offsetParent;
            --topIndex;
        }
    },

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
                        if (ddcontrol.iframeShim) {
                            ddcontrol.iframeShim.hide();
                        }
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

});
