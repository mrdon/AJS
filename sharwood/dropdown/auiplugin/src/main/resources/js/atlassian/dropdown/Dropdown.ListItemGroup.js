/**
 * A list item group has key handling for shifting focus with the vertical arrow keys,
 * and accepting an item with the return key.
 *
 * @constructor AJS.Dropdown.ListItemGroup
 * @extends AJS.List
 */
AJS.Dropdown.ListItemGroup = AJS.List.extend({

    keys: {

        up: function(e) {
            this.shiftFocus(-1);
            e.preventDefault();
        },

        down: function(e) {
            this.shiftFocus(1);
            e.preventDefault();
        },

        "return": function(e) {
            this.items[this.index].trigger("accept");
            e.preventDefault();
        }
    }
});
