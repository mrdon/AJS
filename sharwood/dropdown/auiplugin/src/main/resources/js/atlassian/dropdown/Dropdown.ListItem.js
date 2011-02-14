/**
 * A list item is an item used in a list.
 *
 * @constructor AJS.Dropdown.ListItem
 * @extends AJS.Control
 */
AJS.Dropdown.ListItem = AJS.Control.extend({

    init: function(options) {

        this._setOptions(options);

        this.$element = AJS.$(this.options.element);
        this.hasfocus = false;

        this._assignEvents("instance", this);
        this._assignEvents("element", this.$element);
    },

    _events: {

        instance: {

            /**
             * Called when item is navigated to by using keyboard or mouse
             *
             * @param event
             */
            focus: function(event) {
                this.hasfocus = true;
                this.$element.addClass(AJS.ACTIVE_CLASS);

                if (!event.noscrolling) {
                    AJS.Dropdown.ListItem.MOTION_DETECTOR.unbind();
                    this.isWaitingForMove = true;
                    this.$element.scrollIntoView(AJS.Dropdown.ListItem.SCROLL_INTO_VIEW_OPTIONS);
                }
            },

           /**
             * Called when item is navigated away from by using keyboard or mouse
             *
             * @param event
             */
            blur: function() {
                this.hasfocus = false;
                this.$element.removeClass(AJS.ACTIVE_CLASS);
            },

            /**
             * When item is clicked or enter key is pressed whilst focused
             *
             */
            accept: function() {

                var event = new jQuery.Event("click"),
                    $target = this.$element.is("a[href]") ? this.$element : this.$element.find("a[href]");

                $target.trigger(event);

                if (!event.isDefaultPrevented()) {
                    window.top.location = $target.attr("href");
                }
            }
        },

        element: {

            // some funkiness to make sure that we do not hover when the content changes underneath

            mousemove: function() {
                if (((this.isWaitingForMove && AJS.Dropdown.ListItem.MOTION_DETECTOR.moved) && !this.hasfocus)
                        || !this.hasfocus) {
                    this.isWaitingForMove = false;
                    this.trigger({
                        type: "focus",
                        noscrolling: true
                    });
                }
            }
        }
    }
});

AJS.Dropdown.ListItem.MOTION_DETECTOR = new AJS.Mouse.MotionDetector();

AJS.Dropdown.ListItem.SCROLL_INTO_VIEW_OPTIONS = {
    duration: 100,
    callback: function() {
        AJS.Dropdown.ListItem.MOTION_DETECTOR.wait();
    }
};
