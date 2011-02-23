/**
 * Creates dropdown menu functionality. It is <strong>STRONGLY</strong> advised that you create these objects through
 * the factory method @see AJS.Dropdown.create
 *
 * @constructor AJS.Dropdown
 * @extends AJS.Control
 */
AJS.Dropdown = AJS.Control.extend({

    CLASS_SIGNATURE: "AJS_DROPDOWN",

    /**
     * @constructor
     * @param {Object | AJS.Dropdown.OptionsDescriptor} options - @see AJS.Dropdown.OptionsDescriptor
     */
    init: function (options) {

        var instance = this;

        if (!(options instanceof AJS.Dropdown.OptionsDescriptor)) {
            this.options = new AJS.Dropdown.OptionsDescriptor(options);
        } else {
            this.options = options;
        }

        this.layerController = new AJS.InlineLayer(this.options.allProperties());
        this.listController = this.options.listController();


        this.listEnabler = function (e) {
            instance.listController._handleKeyEvent(e);
        };

        // we need to do cleanup if the inlinelayer is hidden by one of its own events
        this.layerController.onhide(function () {
           instance.hide();
        });

        this.layerController.contentChange(function () {
            instance.listController.removeAllItems();
            instance.layerController.layer().find("li").each(function () {
                instance.listController.addItem(new AJS.Dropdown.ListItem({ element: this }));
            });
            if (instance.options.focusFirstItem()) {
                instance.listController.shiftFocus(0);
            } else {
            instance.listController.prepareForInput();
        }
        });

        this.trigger(this.options.trigger()); // bind trigger events

        this._applyIdToLayer();
    },

    /**
     * Shows dropdown, in the case of an ajax dropdown this will make a request to get content if there isn't already some
     *
     * @method show
     */
    show: function () {
        var instance = this;
        this.trigger().addClass(AJS.ACTIVE_CLASS);
        this.layerController.show();
        if (this.options.focusFirstItem()) {
            this.listController.shiftFocus(0);
        } else {
            this.listController.prepareForInput();
        }
    },

    /**
     * Hides dropdown
     *
     * @method hide
     */
    hide: function () {
        this.trigger().removeClass(AJS.ACTIVE_CLASS);
        this.layerController.hide();
        this.listController.trigger("blur");
    },

    /**
     * Hides and shows dropdown
     *
     * @method toggle
     */
    toggle: function () {
        if (this.layerController.isVisible()) {
            this.hide();
        } else {
            this.show();
        }
    },

    /**
     * Sets/Gets content. Delegates to layer controller.
     *
     * @method trigger
     * @param {jQuery} content
     * @return {jQuery}
     */
    content: function (content) {
        if (content) {
            this.layerController.content(content);
        } else {
            return this.layerController.content();
        }
    },

    /**
     * Sets/Gets trigger. If setting, unbinds events of previous trigger (if there was one), binding events to new one.
     *
     * @method trigger
     * @param {jQuery} trigger
     * @return {jQuery}
     */
    trigger: function (trigger) {
        if (trigger) {

            if (this.options.trigger()) {
                this._unassignEvents("trigger", this.options.trigger());
            }

            this.options.trigger(AJS.$(trigger));

            if (!this.layerController.offsetTarget()) {
                this.layerController.offsetTarget(this.options.trigger());
            }

            this._assignEvents("trigger", this.options.trigger());

        } else {
            return this.options.trigger();
        }
    },

    _applyIdToLayer: function () {
        if (this.trigger().attr("id")) {
            this.layerController.layer().attr("id", this.trigger().attr("id") + "_drop");
        }
    },

    _events: {
        trigger: {
            click: function (e) {
                e.preventDefault(); // in-case we are a link
                this.toggle();
            }
        }
    }

});

// static
AJS.Dropdown.TRIGGER_SELECTOR = ".aui-dropdown-trigger";
AJS.Dropdown.CONTENT_SELECTOR = ".aui-dropdown-content";

/** Preserve legacy namespace
    @deprecated AJS.DropDown */
AJS.DropDown = AJS.Dropdown;

/**
 * Static factory method to create multiple dropdowns at one time.
 *
 * @method AJS.Dropdown.create
 * @param options - @see AJS.Dropdown.descriptor
 * @return {Array}
 */
AJS.Dropdown.create = function (options) {

    var dropdowns = [];

    if (options.content && !options.trigger) {
        options.content = AJS.$(options.content);

        AJS.$.each(options.content, function () {
            var instanceOptions = AJS.copyObject(options);
            instanceOptions.content = AJS.$(this);
            dropdowns.push(new AJS.Dropdown(instanceOptions));
        });
    } else if (!options.content && options.trigger) {
        options.trigger = AJS.$(options.trigger);

        AJS.$.each(options.trigger, function () {
            var instanceOptions = AJS.copyObject(options);
            instanceOptions.trigger = AJS.$(this);
            dropdowns.push(new AJS.Dropdown(instanceOptions));
        });
    } else if (options.content && options.trigger) {
        options.content = AJS.$(options.content);
        options.trigger = AJS.$(options.trigger);

        if (options.content.length === options.trigger.length) {
            options.trigger.each(function (i) {
                var instanceOptions = AJS.copyObject(options);
                instanceOptions.trigger = AJS.$(this);
                instanceOptions.content = options.content.eq(i);
                dropdowns.push(new AJS.Dropdown(instanceOptions));
            })
        } else {
            throw new Error("AJS.Dropdown.create: Expected the same number of content elements as trigger elements");
        }
    }

    return dropdowns;
};
