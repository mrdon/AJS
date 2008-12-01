var testAjs = {

    testAjsExists : function() {
        return (typeof AJS != "undefined" && AJS != null);
    },

    testConsoleExists : function() {
        return (typeof console != "undefined" && console != null);
    },

    // When Dmitry adds actual tests, he's going to make this smarter, but keep
    // the function name the same.
    getTestNames : function() {
        return ["testAjsExists", "testConsoleExists"];
    }

};

testAjs.testAjsExists();