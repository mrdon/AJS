/**
 * Defines interface and 'intelligent' guesses intended behaviour for inline dialog
 *
 * @constructor AJS.InlineLayer.OptionsDescriptor
 * @extends AJS.Descriptor
 */
AJS.InlineLayer.OptionsDescriptor = AJS.Descriptor.extend({

    init: function (properties) {

        this._super(properties);

        if (!this.contentRetriever()) {
            if (this.ajaxOptions()) {
                this.contentRetriever(new AJS.AjaxContentRetriever(this.ajaxOptions()));
            } else if (this.content()) {
                this.contentRetriever(new AJS.DOMContentRetriever(this.content()));
            } else {
                throw new Error("AJS.InlineLayer.OptionsDescriptor: Expected either [ajaxOptions] or [contentRetriever] or [content] to be defined");
            }
        }

        if (!AJS.params.ignoreFrame && this._inIFrame()) {
            this.positioningController(new AJS.InlineLayer.IframePositioning());
        } else {
            this.positioningController(new AJS.InlineLayer.StandardPositioning());
        }
        if (AJS.$.browser.msie && this.positioningController().isOffsetIncludingScroll) {
            this.positioningController().isOffsetIncludingScroll(false);
        }


        if (!this.offsetTarget() && this.content()) {
            this.offsetTarget(this.content().prev());
        }
    },

    _inIFrame: function() {
        // The following is equivalent to ...
        // return top !== self && top.AJS;
        // ... with added cross-origin checks.
        var parentWindow = window;
        try {
            while (parentWindow.parent !== parentWindow) { // Note: Accessing topWindow.parent might throw an error.
                parentWindow = parentWindow.parent;
                if (parentWindow.AJS) {
                    return true;
                }
            }
        } catch (error) {
            // The same-origin policy prevents access to parentWindow.parent.
            // Ignore this error and return false.
        }
        return false;
    },


    /**
     * Gets default options
     *
     * @method _getDefaultOptions
     * @return {Object}
     */
    _getDefaultOptions: function () {
        return {
            alignment: AJS.INTELLIGENT_GUESS,
            hideOnScroll: ".content-body",
            cushion: 20,
            width: 200
        };
    },

    /**
     * Sets/Gets positioningController.
     *
     * @method positioningController
     * @param {Object} positioningController
     */
    positioningController: function (positioningController) {
        if (positioningController) {
            this.properties.positioningController = positioningController;
        } else {
            return this.properties.positioningController;
        }
    },

    /**
     * Sets/Gets ajaxOptions. If ajaxOptions is a string it will treat it as the url for the request.
     *
     * @method ajaxOptions
     * @param {String, Object} ajaxOptions
     */
    ajaxOptions: function (ajaxOptions) {
        if (ajaxOptions) {
            this.properties.ajaxOptions = ajaxOptions;
        } else {
            return this.properties.ajaxOptions;
        }
    },

    /**
     * Sets/Gets content, this is the element that will be appended to the dropdown.
     *
     * @method content
     * @param {String, HTMLElement, jQuery} content
     * @return {Undefined, jQuery}
     */
    content: function (content) {
        if (content) {
            content = AJS.$(content);
            if (content.length) {
                this.properties.content = content;
            }
        } else if (this.properties.content && this.properties.content.length) {
            return this.properties.content;
        }
    },

    /**
     * Sets/Gets content retriever. A content retriever is an object that defines the mechanisms for retrieving content.
     * It is possible to define your own content retriever. As long as the object defines specific methods. You can look
     * at @see AJS.DOMContentRetriever as an example
     *
     * @method contentRetriever
     * @param {AJS.AjaxContentRetriever, AJS.DOMContentRetriever, *} contentRetriever
     * @return {AJS.AjaxContentRetriever, AJS.DOMContentRetriever, *} contentRetriever
     */
    contentRetriever: function (contentRetriever) {
        if (contentRetriever) {
            this.properties.contentRetriever = contentRetriever;
        } else {
            return this.properties.contentRetriever;
        }
    },

    /**
     * Sets/Gets offset target.
     *
     * @method offsetElement
     * @return {jQuery}
     */
    offsetTarget: function (offsetTarget) {
        if (offsetTarget) {
            offsetTarget = AJS.$(offsetTarget);
            if (offsetTarget.length) {
                this.properties.offsetTarget = offsetTarget;
            }
        } else if (this.properties.offsetTarget && this.properties.offsetTarget.length) {
            return this.properties.offsetTarget;
        }
    },

    /**
     * Gets/Sets cushion. This is the pixel buffer between the bottom edge of the InlineLayer DOM element and the bottom
     * of the window.
     *
     * @method cushion
     * @param {Number} cushion
     * @return {Number}
     */
    cushion: function (cushion) {
        if (cushion) {
            this.properties.cushion = cushion;
        } else {
            return this.properties.cushion;
        }
    },

    /**
     * Gets/Sets styleClass. This is class/classes applied to the dropdown div
     */
    styleClass: function (styleClass) {
        if (styleClass) {
            this.properties.styleClass = styleClass;
        } else {
            return this.properties.styleClass;
        }
    },

    /**
     * Gets/Sets hideOnScroll selector. This is a parent element of the layer that when scrolled will hide inlineLayer.
     *
     * @method hideOnScroll
     * @param {String} hideOnScroll
     * @return {String}
     */
    hideOnScroll: function (hideOnScroll) {
        if (hideOnScroll) {
            this.properties.hideOnScroll = hideOnScroll;
        } else {
            return this.properties.hideOnScroll;
        }
    },

    /**
     * Sets the alignment of the inline layer in reference to it's offset element. If AJS.INTELLIGENT_GUESS, will
     * determine if the the offsetElement is further to the right or left of the window. If further to the right will
     * align right and vice versa.
     *
     * @method alignment
     * @param {AJS.LEFT, AJS.RIGHT, AJS.INTELLIGENT_GUESS} alignment
     * @return {AJS.LEFT, AJS.RIGHT, AJS.INTELLIGENT_GUESS}
     */
    alignment: function (alignment) {
        if (alignment) {
            this.properties.alignment = alignment;
        } else {
            return this.properties.alignment;
        }
    },

    /**
     * Sets the width of the inline layer in reference to it's offset element.
     *
     * @method alignment
     * @param {Number} width
     * @return {Number}
     */
    width: function (width) {
        if (width) {
            this.properties.width = width;
        } else {
            return this.properties.width;
        }
    }
});
