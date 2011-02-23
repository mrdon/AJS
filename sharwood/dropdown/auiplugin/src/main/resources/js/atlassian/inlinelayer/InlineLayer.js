/**
 * A control that when specified element [offsetTarget] is clicked positions specified content absolutely underneath.
 *
 * @constructor AJS.InlineLayer
 * @extends AJS.Control
 */
AJS.InlineLayer = AJS.Control.extend({

    CLASS_SIGNATURE: "AJS_InlineLayer",

    SCROLL_HIDE_EVENT: "scroll.hide-dropdown",

    /**
     * @constructor
     * @param {Object} options - @see AJS.InlineLayer.OptionsDescriptor
     */
    init: function (options) {

        var instance = this;

        if (!(options instanceof AJS.InlineLayer.OptionsDescriptor)) {
            this.options = new AJS.InlineLayer.OptionsDescriptor(options);
        } else {
            this.options = options;
        }

        this.offsetTarget(this.options.offsetTarget());

        this.contentRetriever = this.options.contentRetriever();
        this.positionController = this.options.positioningController();

        if (!(this.contentRetriever instanceof AJS.ContentRetriever)) {
            throw new Error("AJS.InlineLayer: Failed construction, Content retriever does not implement interface "
                    + "[AJS.ContentRetrieverInterface]");
        }

        this.contentRetriever.startingRequest(function () {
            instance._showLoading();
        });

        this.contentRetriever.finishedRequest(function () {
            instance._hideLoading();
        });

        // people may want to assign events so creating it just incase
        this.$layer = this._render("layer", this.options.alignment());
    },

    // Getters and Setters

    /**
     * Gets and sets content.
     * - If provided a function and content retriever is asynchronous, will wait for server response
     * before executing function.
     * - If provided a DOM element or jQuery element will override current content
     *
     * @method content
     * @param {Function | HTMLElement | jQuery} arg
     */
    content: function (arg) {

        var instance = this;

        // and we are a function, we are going to get content and wait for it (async) if it hasn't been set yet
        if (AJS.$.isFunction(arg)) {

            // if we are not waiting for a response
            if (this.contentRetriever.isLocked()) {

                throw new Error(this.CLASS_SIGNATURE + ".content() : Illegal operation, trying to access content while it is "
                        + "locked. If you are seeing this error it is most likely because we are waiting for an request to "
                        + "come back from the server that builds content");
            }

            // once we have it
            this.contentRetriever.content(function (content) {

                // set our content
                instance.$content = content.removeClass("hidden");

                // then call our callback in context of this inlineLayer instance
                arg.call(instance);

            });

        } else  {

            // if we provide no callback, then we are assuming our content retriever already has the content.
            // No callback required.
            return this.$content;
        }
    },

    /**
     * Gets/Sets offsetTarget. This is the element the layer will be positioned absolutely underneath
     *
     * @method offsetTarget
     * @param {HTMLElement | jQuery | string} offsetTarget
     * @return {jQuery}
     */
    offsetTarget: function (offsetTarget) {
        if (offsetTarget) {
            this.$offsetTarget = AJS.$(offsetTarget);
        }
        return this.$offsetTarget;
    },


    /**
     * Adds a callback when the content has been changed. If no argument has been provided will execute callbacks.
     *
     * Important! Only use if you are using this object in a composite class. Otherwise consider creating a custom event
     * instead.
     *
     * @method contentChange
     * @param {Function} callback
     */
    contentChange: function (callback) {

        var event, instance = this;

        if (AJS.$.isFunction(callback)) {

            if (!this.contentChangeCallback) {
                this.contentChangeCallback = [];
            }

            this.contentChangeCallback.push(callback);

        } else if (!callback && this.contentChangeCallback) {

            AJS.$.each(this.contentChangeCallback, function (i, callback) {
                callback(instance);
            });

            AJS.trigger("contentChange", this.layer());
            this.setWidth(this.options.width());

        }
    },

    /**
     * Adds a callback when dropdown is hidden. If no argument has been provided will execute callbacks.
     *
     * Important! Only use if you are using this object in a composite class. Otherwise consider creating a custom event
     * instead.
     *
     * @param {Function} callback
     */
    onhide: function (callback) {

        var instance = this;

        if (AJS.$.isFunction(callback)) {

            if (!this.hideCallback) {
                this.hideCallback = [];
            }

            this.hideCallback.push(callback);

        } else if (!callback && this.hideCallback) {

            AJS.$.each(this.hideCallback, function (i, callback) {
                callback(instance);
            });
        }
    },

    /**
     * Gets layer element
     *
     * @method layer
     * @return {jQuery}
     */
    layer: function (layer) {
        if (layer) {
            this.$layer = layer;
        } else {
            return this.$layer;
        }
    },

    // Getters ONLY (readonly)

    /**
     * Gets placeholder. When the layer is visible it is appended to the body. When we hide, we put it back to its
     * original position (within this placeholder) so that when we empty a parent node it is destroyed when expected.
     *
     * @method placeholder
     */
    placeholder: function () {
        return this.$placeholder;
    },

    /**
     * Gets boolean if visible or not
     *
     * @method isVisible
     * @return {Boolean}
     */
    isVisible: function () {
        return this.visible;
    },

    /**
     * Gets scrollable container. The scrollable container is a parent element of $layer/$offsetTarget that when
     * scrolled causes the InlineLayer to be hidden.
     *
     * @method scrollableContainer
     * @return {jQuery}
     */
    scrollableContainer: function () {
        return this.$scrollableContainer;
    },

    /**
     * This control is lazy initialized. This flag will be true when content has been appended and layer is visible
     * for the first time.
     *
     * @method isInitialized
     * @return {Boolean}
     */
    isInitialized: function () {
        return this.initialized;
    },

    /**
     * Hides layer and restores to original DOM position
     *
     * @method hide
     */
    hide: function () {

        if (!this.isVisible()) {
            return false;
        }

        this.visible = false;

        this.layer().removeClass(AJS.ACTIVE_CLASS).hide();
        this.$offsetTarget.removeClass(AJS.ACTIVE_CLASS);

        // we need to put it back so that it is cleared when dialog content is emptied...
        var positionController = this.positionController;
        setTimeout(function() {
            // ...but not before the current "click" live event completes, otherwise IE will not fire other click handlers.
            positionController.appendToPlaceholder();
        }, 0);

        this._unbindEvents();
        this.onhide();

        AJS.$(document).trigger("hideLayer", [this.CLASS_SIGNATURE, this]);
        AJS.InlineLayer.current = null;
    },

    /**
     * Refreshes content. This is usually used when you have an asyncronous content retriever such as
     * @see AJS.AjaxContentRetriever and you want to get the latest from the server.
     *
     * @method refreshContent
     * @param callback - function to be called once content is refreshed
     */
    refreshContent: function (callback) {
        var instance = this;
        this.content(function () {
            this.layer().empty().append(this.content());
            if (AJS.$.isFunction(callback)) {
                callback.call(instance);
            }
            this.contentChange();
        });
    },

    /**
     * Shows layer, retrieving content if required.
     *
     * @method show
     */
    show: function () {

        var instance = this;

        if (this.isVisible()) {
            return;
        }

        if (!this.isInitialized()) {
            this._lazyInit(function () {
                instance._show();
            });
        } else if (this.contentRetriever.cache() === false) {
            this.refreshContent(function () {
                instance._show();
            });
        } else {
            instance._show();
        }
    },

    /**
     * Sets absolute position and alignment based on [offsetTarget] and defined options. If the full layer element
     * is not visible in the viewport, a slow scroll will occur to pull it into view.
     *
     * @method setPosition
     */
    setPosition: function () {

        var positioning,
            scrollTop;

        if (!this.isInitialized() || !this.offsetTarget() || this.offsetTarget().length === 0) {
            return;
        }

        if (this.options.alignment() === AJS.RIGHT) {
            positioning = this.positionController.right();
        } else if (this.options.alignment() === AJS.LEFT) {
            positioning = this.positionController.left();
        } else if (this.options.alignment() === AJS.INTELLIGENT_GUESS) {
            if ((this.offsetTarget().offset().left + this.layer().outerWidth() / 2) > AJS.$(window).width() / 2) {
                positioning = this.positionController.right();
            } else {
                positioning = this.positionController.left();
            }
        }

        if (AJS.dim.dim) {
            scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
            positioning.maxHeight = AJS.$(window).height() + scrollTop - positioning.top - this.options.cushion();
        }

        this.layer().css(positioning);
    },


    /**
     *  Sets to the width specified.
     *  Adds horizontal scrollbar if specified and content is wider than specified width.
     *
     *
     * @param {Number} width
     * @param {Boolean} showhorizontalScroll
     */
    setWidth: function (width, showhorizontalScroll) {




        var contentScrollWidth = this.content().attr("scrollWidth");


        // exemplary sophisticated error handling
        if (!(this.content().hasClass("error") || this.content().hasClass("warn"))) {
            this.content().css({
                whiteSpace: "nowrap",
                overflowX: "",
                width: "auto"
            });
        }

        if (contentScrollWidth <= width) {
            this.layer().css({
                width: width,
                whiteSpace: ""
            });
        } else if (showhorizontalScroll) {
            this.layer().css({
                width: width,
                overflowX: "auto",
                whiteSpace: ""
            });
        } else {
            this.layer().css({
                width: contentScrollWidth,
                overflowX: "hidden",
                whiteSpace: ""
            });
        }
    },

    /**
     * Gets content, and builds necessary furniture.
     *
     * @method _lazyInit
     * @protected
     * @param {Function} callback - called after control is ready
     */
    _lazyInit: function (callback) {

        this.initialized = true;

        this.refreshContent(function () {

            var instance = this;

            // We want to make our own wrapper and append the content to that, so we can be sure we have the correct css style
            this.layer().insertAfter(this.offsetTarget());

            this.$placeholder = AJS.$("<div class='ajs-layer-placeholder' />").insertAfter(this.offsetTarget());
            this.$scrollableContainer = this.offsetTarget().closest(this.options.hideOnScroll());
            this.positionController.set(this.layer(), this.offsetTarget(), this.placeholder());
            this.positionController.rebuilt(function (layer) {
                instance.layer(layer);
            });

            callback(); // show
        });

    },

    /**
     * Shows layer, appends to body and binds events
     *
     * @method _show
     * @protected
     */
    _show: function () {

        if (AJS.InlineLayer.current) {
            AJS.InlineLayer.current.hide();
        }

        this.visible = true;

        this.content().show();

        this.positionController.appendToBody();

        this.layer().addClass(AJS.ACTIVE_CLASS);
        this.$offsetTarget.addClass(AJS.ACTIVE_CLASS);
        this.layer().show();

        this.setWidth(this.options.width());
        this.setPosition();
        this._bindEvents();

        if (!AJS.dim.dim) {
            this.positionController.scrollTo();
        }

        AJS.InlineLayer.current = this;
        AJS.$(document).trigger("showLayer", [this.CLASS_SIGNATURE, this]);
    },

    /**
     * Removes a loading class to [offsetTarget] and [layer].
     *
     * @method _hideLoading
     */
    _hideLoading: function () {
        this.$layer.removeClass(AJS.LOADING_CLASS);
        this.$offsetTarget.removeClass(AJS.LOADING_CLASS);
    },

    /**
     * Adds a loading class to [offsetTarget] and [layer]. Actual styling is left to CSS.
     *
     * @method _showLoading
     */
    _showLoading: function () {
        this.$layer.addClass(AJS.LOADING_CLASS);
        this.$offsetTarget.addClass(AJS.LOADING_CLASS);
    },

    /**
     * Removes all bound events
     *
     * @method _unbindEvents
     * @protected
     */
    _unbindEvents: function () {
        this.$scrollableContainer.unbind(this.SCROLL_HIDE_EVENT);
        this._unassignEvents("container", document);
        this._unassignEvents("win", window);
    },

    /**
     * Binds all events
     *
     * @method _bindEvents
     * @protected
     */
    _bindEvents: function () {
        var instance = this;
        this.$scrollableContainer.one(this.SCROLL_HIDE_EVENT, function () {
             instance.hide();
        });
        this._assignEvents("container", document);
        this._assignEvents("win", window);
    },

    /**
     * Determines if the click event was valid to close InlineLayer.
     *
     * An invalid click if:
     * - is [offsetTarget]
     * - is a child of [offsetTarget]
     * - is a child of [layer]
     *
     * @param {Event} e
     * @return {Boolean}
     */
    _validateClickToClose: function (e) {

        if (e.target === this.offsetTarget()[0]) {
            return false;
        } else if (e.target === this.layer()[0]) {
            return false;
        } else if (this.offsetTarget().has(e.target).length > 0) {
            return false;
        } else if (this.layer().has(e.target).length > 0) {
            return false;
        }

        return true;
    },

    _events: {

        container : {
            keydown: function (e) {
                if (AJS.Keyboard.specialKeyEntered(e) === AJS.Keyboard.SpecialKey.ESC) {
                    this.hide();
                }
            },
            keypress: function (e) {
                if (AJS.Keyboard.specialKeyEntered(e) === AJS.Keyboard.SpecialKey.ESC) {
                    this.hide();
                }
            },
            click: function (e) {
                if (this._validateClickToClose(e)) {
                    this.hide();
                }
            }
        },
        win: {
            resize: function () {
                this.setPosition();
            },
            scroll: function () {
                this.setPosition();
            }
        }
    },


    _renders: {

        layer: function () {
            return AJS.$("<div />").addClass("ajs-layer " + (this.options.styleClass() || ""));
        }
    }

});




/**
 * Static factory method to create multiple dropdowns at one time.
 *
 * @method create
 * @namespace AJS.InlineLayer
 * @param options - @see AJS.InlineLayer.OptionsDescriptor
 * @return {Array}
 */
AJS.InlineLayer.create = function (options) {

    var inlineLayers = [];

    if (options.content) {
        options.content = AJS.$(options.content);
        AJS.$.each(options.content, function () {
            var instanceOptions = AJS.copyObject(options);
            instanceOptions.content = AJS.$(this);
            inlineLayers.push(new AJS.InlineLayer(instanceOptions));
        });
    }

    if (inlineLayers.length == 1) {
        return inlineLayers[0];
    } else {
        return inlineLayers;
    }
};
