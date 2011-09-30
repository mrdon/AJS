module("Underscore Unit Tests");

// Note: underscore will be required by any path including "underscorejs-unit-tests"
test("Check if Underscore can be loaded", function() {
    var underscoreIsDefined = (typeof _ == 'undefined') ? false : true;
    ok(underscoreIsDefined, " Underscore has not loaded. ");        
});
