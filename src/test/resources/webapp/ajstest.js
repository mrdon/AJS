AJSTest = function () {};
AJSTest.prototype.addTest = function (name, test) {
    if (typeof test == "function") {
        if (name in this) {
            throw new Error("Test with name “" + name + "” already exists.");
        }
        this[name] = test;
        this.names = this.names || [];
        this.names.push(name);
    }
};
AJSTest.prototype.getTestNames = function () {
    return this.names;
};

var testAjs = new AJSTest();
