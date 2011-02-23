AJS.copyObject = function (object, deep) {

    var copiedObject = {};

        AJS.$.each(object, function(name, property) {
            if (typeof property !== "object" || property === null || property instanceof AJS.$) {
                copiedObject[name] = property;
            } else if (deep !== false) {
                copiedObject[name] = AJS.copyObject(property, deep);
            }
        });

    return copiedObject;
};
