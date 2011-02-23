/**
 * Handles positiong of dropdown in iframes. Need to calculate the offset of the iframe as well. Some browsers
 * will return the iframe offset without taking scroll into account. This is handled by an instance property
 * 'add scroll'
 *
 * @constructor AJS.InlineLayer.IframePositioning
 * @extend AJS.InlineLayer.StandardPositioning
 */
AJS.InlineLayer.IframePositioning = AJS.InlineLayer.StandardPositioning.extend({

    /**
     * Calculates offset of iframe and offsetTarget
     *
     * @method offset
     * @return {Object}
     */
    offset: function () {

        var offsetInDocument = this._super(),
            iframeOffset = AJS.$("iframe[name=" + window.name + "]", window.top.document.body).parent().offset(),
            topDocumentScrollTop = this._topDocumentScrollTop(),
            topDocumentScrollLeft = this._topDocumentScrollLeft(),
            iframeScrollTop = this._iframeScrollTop(),
            iframeScrollLeft = this._iframeScrollLeft(),
            // we need to account for document scroll and 'forget' iframe scroll, as the resulting offset should be with regards to the top document
            scrollTopModifier = topDocumentScrollTop - iframeScrollTop,
            scrollLeftModifier = topDocumentScrollLeft - iframeScrollLeft;

        return {
            left: iframeOffset.left + offsetInDocument.left + scrollLeftModifier,
            top:  iframeOffset.top + offsetInDocument.top + scrollTopModifier
        };
    },

    _topDocumentScrollTop: function() {
        return this.isOffsetIncludingScroll() ? 0 : Math.max(window.top.document.body.scrollTop, window.top.document.documentElement.scrollTop);
    },

    _topDocumentScrollLeft: function() {
        return this.isOffsetIncludingScroll() ? 0 : Math.max(window.top.document.body.scrollLeft, window.top.document.documentElement.scrollLeft);
    },

    _iframeScrollTop: function() {
        return this.isOffsetIncludingScroll() ? 2 * Math.max(window.document.body.scrollTop, window.document.documentElement.scrollTop) : 0;
    },

    _iframeScrollLeft: function() {
        return this.isOffsetIncludingScroll() ? 2 * Math.max(window.document.body.scrollLeft, window.document.documentElement.scrollLeft) : 0;
    },

    /**
     * <p>
     * Gets/sets a boolean flag that controls how this positioning instance
     * computes the offsets in case of scrolling. If set to
     * <code>true</code>, this positioning will behave as if the offset methods
     * did include non-visible scrolled out areas. This has implications over how
     * the real offset of the dropdown layer within the top document is calculated,
     * and the offset results are non consistent across different browsers in those
     * terms.
     *
     * <p>
     * The default value for this property is <code>true</code> (as in FF and Safari).
     *
     * @method isOffsetIncludingScroll
     * @param offsetIncludingScroll {boolean}
     * @return {boolean}
     */
    isOffsetIncludingScroll: function(offsetIncludingScroll) {
        if (typeof this.offsetIncludingScroll === "undefined") {
            this.offsetIncludingScroll = true;
        }
        if (typeof offsetIncludingScroll !== "undefined") {
            this.offsetIncludingScroll = offsetIncludingScroll;
        }
        return this.offsetIncludingScroll;
    },

    /**
     * Appends to top document body
     *
     * @method appendToBody
     */
    appendToBody: function () {
        window.top.jQuery("body").append(this.$layer);
    },


    /**
     * Gets top window
     *
     * @method window
     * @return {window}
     */
    window: function () {
        return window.top;
    },

    /**
     * We are not doing any scrolling, but need to override
     *
     * @method scrollTo
     */
    scrollTo: function () {}

});

if (AJS.$.browser.safari || (AJS.$.browser.msie && AJS.$.browser.version < 8)) {
    // Handles positiong of dropdown in DOM for IE7 and below iframes.
    // IE7 & Webkit do not allow a parent document to adopt nodes so we need to rebuild
    AJS.InlineLayer.IframePositioning = AJS.InlineLayer.IframePositioning.extend({

        /**
         * Appends to body, rebuilding element in context of parent document
         *
         * @method appendToBody
         */
        appendToBody: function () {
            this.$layer = this._rebuildLayerInParent();
            window.top.jQuery("body").append(this.$layer);
            this.rebuilt();
        },

        /**
         * Appends to placeholder, rebuilding element in context of iframe document
         *
         * @method appendToPlaceholder
         */
        appendToPlaceholder: function () {
            this.$layer = this._rebuildLayerInIframe();
            this.$layer.appendTo(this.$placeholder);
            this.rebuilt();
        },

        /**
         * Rebuilds layer in context of parent DOM
         *
         * @method _rebuildLayerInParent
         * @protected
         * @return {jQuery}
         */
        _rebuildLayerInParent: function () {
            return window.top.jQuery("<div class='ajs-layer'>" + this.$layer.html() + "</div>");
        },

        /**
         * Rebuilds layer in context of iframe DOM
         *
         * @method _rebuildLayerInIframe
         * @protected
         * @return {jQuery}
         */
        _rebuildLayerInIframe: function () {
            return AJS.$("<div class='ajs-layer'>" + this.$layer.html() + "</div>");
        }
    });
}
