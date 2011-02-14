/**
 * Group is an ordered list of items that can be navigated via the keyboard or mouse. What keys and used to navigate the
 * list are defined in sub classes. You would use an extension of this control when you primary purpose it to navigate
 * a list or group of items. This could be things like navigating an issue table.
 *
 * @constructor AJS.List
 * @extends AJS.Control
 */
AJS.List = AJS.Control.extend({

    init: function() {
        this.items = [];
        this.index = -1;
        this._assignEvents("instance", this);
    },

    /**
     * Add an item to this group.
     *
     * @method addItem
     * @param {AJS.Control} item
     */
    addItem: function(item) {
        this.items.push(item);
        this._assignEvents("item", item);
    },

    /**
     * Remove an item from this group.
     *
     * @method removeItem
     * @param {AJS.Control} item
     */
    removeItem: function(item) {

        var index = AJS.$.inArray(item, this.items);

        if (index < 0) {
            throw new Error("AJS.List: item [" + item + "] is not a member of this group");
        }

        item.trigger("blur");

        if (index < this.index) {
            this.index--;
        }

        this.items.splice(index, 1);
        this._unassignEvents("item", item);
    },

    /**
     * Remove all items from this group.
     *
     * @method removeAllItems
     */
    removeAllItems: function() {

        for (var i = 0; i < this.items.length; i++) {
            this._unassignEvents("item", this.items[i]);
            this.items[i].trigger("blur");
        }

        this.index = -1;
        this.items.length = 0;
        this._unassignEvents("keys", document);
    },

    /**
     * Move focus to a new item, relative to the currently focused item.
     *
     * @method shiftFocus
     * @param {Number} offset -- The position of the item to focus, relative to the position of the currently focused item.
     */
    shiftFocus: function(offset) {

        if (this.index === -1 && offset === 1) {
            offset = 0;
        }

        if (this.items.length > 0) {

            var i = (Math.max(0, this.index) + this.items.length + offset) % this.items.length;

            this.items[i].trigger("focus");
        }
    },

    /**
     * Assigns events so that (ie in the case of a dropdown, if no items are focused that key down will focus first time)
     * @method prepareForInput
     *
     */
    prepareForInput: function () {
        this._assignEvents("keys", document);
    },

    _events: {
        "instance": {
            "focus": function() {
                if (this.items.length === 0) {
                    return;
                }
                if (this.index < 0) {
                    this.items[0].trigger("focus");
                } else {
                    this._assignEvents("keys", document);
                }
            },
            "blur": function() {
                if (this.index >= 0) {
                    this.items[this.index].trigger("blur");
                } else {
                    this._unassignEvents("keys", document);
                }
            }
        },
        "keys": {
            "keydown keypress": function(event) {
                this._handleKeyEvent(event);
            }
        },
        "item": {
            "focus": function(event) {
                var index = this.index;
                this.index = AJS.$.inArray(event.target, this.items);
                if (index < 0) {
                    this.trigger("focus");
                } else if (index !== this.index) {
                    this.items[index].trigger("blur");
                }
            },
            "blur": function(event) {
                if (this.index === AJS.$.inArray(event.target, this.items)) {
                    this.index = -1;
                    this.trigger("blur");
                }
            },
            "remove": function(event) {
                this.removeItem(event.target);
            }
        }
    },

    keys: {
        // Key handlers may be added by descendant classes.
    }


});
