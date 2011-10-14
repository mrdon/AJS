module("HTML5shim Unit Tests", {
    setup: function(){
        document.getElementById("qunit-fixture").innerHTML = '<section id="html5">I\'m a section</section>';
    }
});

test("html5 support / shim test in IE8 and below", function() {

    // check section tag has green background (only works if HTML5 supported)
    var html5message,
        whatWeWant = "block",
        theBackground = AJS.$("#html5").css("display");

    if ( AJS.$.browser.msie && parseInt(AJS.$.browser.version) < 9 ) {
        html5message = " HTML5 elements should be supported by shim. ";
    } else {
        html5message = " HTML5 elements should be natively supported. ";
    }

    equal(theBackground, whatWeWant, html5message);

});