/**
 * Abstract base class for UI controls. It provides a uniformed way of dealing with things such as events, DOM node
 * creation and settings. The goal of this class is to encourage the developer to separate out rendering and events
 * from logic to increase unit testability and clarity of code.
 *
 * Classes extending this look like
 *
 * AJS.Control.extend ({
 *     keys: {
 *         a: function () {
 *             // do something when a is pressed
 *         }
 *     },
 *     _events: {
 *         label: {
 *             focus: function () {},
 *             click: function () {}
 *         }
 *     },
 *     _renders: {
 *         label: function () {
 *             // return jQuery node
 *         }
 *     }
 * })
 *
 * 
 * @constructor AJS.Control
 */


AJS.Control = Class.extend({

    /**
     * Allows binding of multiple events via a group. Event groups are stored under the _events property of the class.
     *
     * Note: By design you are not allowed to bind the same event handler twice.
     *
     * @method _assignEvents
     * @protected
     * @param {String} group - name of object group containing events
     * @param {String | HTMLElement | jQuery} target - element to bind events to
     */
    _assignEvents: function (group, target) {

        var instance = this;

        if (!(target instanceof AJS.$)) {

            target = AJS.$(target);

            if (target.length === 0) {
                // Warn: No target supplied.
                return;
            }
        }

        AJS.$.each(this._events[group], function(eventType, handler) {

            if (!instance._hasEventHandler(target, eventType, handler)) {

                instance._markEventHandler(target, eventType, handler);

                target.bind(eventType, function(event) {
                    handler.call(instance, event, AJS.$(this));
                });
            }

        });

    },


    /**
     * Allows unbinding of multiple events via a group. Event groups are stored under the _events property of the class.
     *
     * @method _assignEvents
     * @protected
     * @param {String} group - name of object group containing events
     * @param {String | HTMLElement | jQuery} target - element to bind events to
     */
    _unassignEvents: function (group, target) {

        var instance = this;

        if (!(target instanceof AJS.$)) {

            target = AJS.$(target);

            if (target.length === 0) {
                // Warn: No target supplied.
                return;
            }
        }

        AJS.$.each(this._events[group], function(eventType, handler) {
            if (instance._hasEventHandler(target, eventType, handler)) {
                instance._unmarkEventHandler(target, eventType, handler);
                target.unbind(eventType, handler);
            }

        });
    },


    /**
     * Checks if the event handler has been marked as bound. Used to prevent double bind. @see markEventHandler
     *
     * @method _hasEventHandler
     * @param target {Object} - element event is bound to
     * @param eventType {String}
     * @param handler {Function}
     */
    _hasEventHandler: function (target, eventType, handler) {

        var i=0,
            hasEventHandler = false,
            activeHandlers = target.data("activeHandlers");

        if (!activeHandlers || !activeHandlers[eventType]) {
            return;
        }

        for (; i < activeHandlers[eventType].length; i++) {
            if (activeHandlers[eventType][i] === handler) {
                hasEventHandler = true;
            }
        }

        return hasEventHandler;
    },

    /**
     * Unmarks the event handler as bound. Used to prevent double bind.
     *
     * @method _unmarkEventHandler
     * @param target {Object} - element event is bound to
     * @param eventType {String}
     * @param handler {Function}
     */
    _unmarkEventHandler: function (target, eventType, handler) {

        var i=0,
            activeHandlers = target.data("activeHandlers");

        if (!activeHandlers || !activeHandlers[eventType]) {
              return;
        }

        activeHandlers = target.data("activeHandlers");

        for (; i < activeHandlers; i < activeHandlers[eventType].length) {
            if (activeHandlers[eventType][i] === handler) {
                activeHandlers[eventType].splice(i, 1);
                break;
            }
        }

        target.data("activeHandlers", activeHandlers);
    },

    /**
     * Marks the event handler bound. Used to prevent double bind.
     *
     * @method _unmarkEventHandler
     * @param target {Object} - element event is bound to
     * @param eventType {String}
     * @param handler {Function}
     */
    _markEventHandler: function (target, eventType, handler) {

        var activeHandlers = target.data("activeHandlers");

        if (!activeHandlers) {
            activeHandlers = {};
        }

        if (!activeHandlers[eventType]) {
            activeHandlers[eventType] = [handler];
        }

        activeHandlers[eventType].push(handler);

        target.data("activeHandlers", activeHandlers);
    },




    /**
     * An abstract method to validate calls to this._handleKeyEvent(e); If this method returns false then the
     * key event will not be handled.
     *
     * @method _isValidInput
     * @return {Boolean}
     */
    _isValidInput: function () {
        return true;
    },

    /**
     * A more descriptive way to handle key events. Use this method to delegate key events to the keys property map.
     *
     * An example of a keys property map looks like this (property names should be a shortcut as supported by
     * AJS.Keyboard.shortcutEntered; the 'onEdit' key handles editing the input):
     *
     * keys: {
     *      "ctrl+a": function (e) {
     *           // handle ctrl+a
     *      },
     *      "return": function (e) {
     *          // do something on enter/return
     *      },
     *      onEdit: function (e, character) {
     *         // handle input edited (character may be undefined, e.g., during backspace or delete).expando
     *      }
     * }
     *
     * @method _handleKeyEvent
     * @param {Object} e - event object
     */
    _handleKeyEvent: function (e) {

        var instance = this,
                character,
                SpecialKey,
                shortcut;

        if (instance._isValidInput(e)) {

            SpecialKey = AJS.Keyboard.SpecialKey;
            shortcut = AJS.Keyboard.shortcutEntered(e);

            if (shortcut) {
                if (instance.keys[shortcut]) {
                    instance.keys[shortcut].call(instance, e);
                    return;
                } else if ((shortcut === SpecialKey.BACKSPACE || shortcut === SpecialKey.DELETE) && instance.keys.onEdit) {
                    instance.keys.onEdit.call(instance, e);
                    return;
                }
            }

            character = AJS.Keyboard.characterEntered(e);

            if (character && instance.keys.onEdit) {
                instance.keys.onEdit.call(instance, e, character);
            }
        }
    },

    /**
     * Used to fire custom events on the AJS.Control instance.
     *
     * @method trigger
     * @param {String} event - The name of the event to trigger.
     */
    trigger: function(event) {
        return AJS.trigger(event, this);
    },

    /**
     * Overrides default options with user options. If the element property is set to a field set, it will attempt
     * to parse options the options from fieldset
     *
     * @method _setOptions
     * @param options
     * @return {String | undefined} if invalid will return this.INVALID
     */
    _setOptions: function (options) {

        var element,
                optionsFromDOM;

        options = options || {};

        // just supplied element selector
        if (options instanceof AJS.$ || typeof options === "string" ||
                (typeof options === "object" && options.nodeName)) {
            options = {element: options};
        }

        element = AJS.$(options.element);

        optionsFromDOM = element.getOptionsFromAttributes();

        this.options = AJS.$.extend(true, this._getDefaultOptions(options), optionsFromDOM, options);

    },

    /**
     * Delegates DOM rendering
     *
     * @method _render
     * @protected
     * @return {jQuery}
     */
    _render: function () {

        var i,
            name = arguments[0],
            args = [];

        for (i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }

        return this._renders[name].apply(this, args);
    }

});
