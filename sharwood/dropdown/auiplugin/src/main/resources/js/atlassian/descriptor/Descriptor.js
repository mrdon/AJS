/**
 * An abstract class used to maintain complex descriptors
 *
 * @constructor AJS.Descriptor
 */
AJS.Descriptor = Class.extend({

    /**
     *
     * @constructor
     * @param {Object} properties - descriptor properties
     */
    init: function (properties) {
        if (this._validate(properties)) {
            this.properties = AJS.$.extend(this._getDefaultOptions(), properties);
        }
    },

    /**
     * Gets all properties
     *
     * @method allProperties
     * @return {Object}
     */
    allProperties: function () {
        return this.properties;
    },

    /**
     * Ensures all required properites are defined otherwise throws error
     *
     * @method _validate
     * @protected
     */
    _validate: function (properties) {
        if (this.REQUIRED_PROPERTIES) {
            AJS.$.each(this.REQUIRED_PROPERTIES, function (name) {
                if (typeof properties[name] === "undefined") {
                    throw new Error("AJS.Descriptor: expected property [" + name + "] but was undefined");
                }
            });
        }
        return true;
    }
});