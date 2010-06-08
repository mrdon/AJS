// Tests for jquery.autocomplete.js

testAjs.addTest("testAutocompleteExists", function () {
    return (typeof jQuery.fn.autocomplete != "undefined" && jQuery.fn.autocomplete != null);
});