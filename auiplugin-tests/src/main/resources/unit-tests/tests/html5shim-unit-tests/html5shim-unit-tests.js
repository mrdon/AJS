module("HTML5shim Unit Tests");

// Note: shim will be required by any path including "html5shim-unit-tests"

test("html5 support / shim test in IE8 and below", function() {

    // check section tag has green background (only works if HTML5 supported)
    var html5bg,
        html5message,
        whatWeWant,
        theBackground = AJS.$("#html5").css("background-color");

    if ( AJS.$.browser.msie && parseInt(AJS.$.browser.version) < 9 ) {
        whatWeWant = "rgb(0,128,0)"; // no spaces
        html5message = " HTML5 elements should be supported by shim. ";
    } else {
        whatWeWant = "rgb(0, 128, 0)"; // spaces
        html5message = " HTML5 elements should be natively supported. ";
    }

    html5bg = ( theBackground == whatWeWant ) ? true : false;
    ok(html5bg, html5message);

});
