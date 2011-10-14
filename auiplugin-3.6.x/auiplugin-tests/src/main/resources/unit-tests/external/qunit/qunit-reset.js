//This reset function overrides the Qunit.reset function so that it doesn't empty #main in product, effectively this disables qunit-fixture as well.

QUnit.reset = function() {
	if ( window.jQuery ) {
	    console.log("QUnit reset disabled due to potential clash with #main");
        // jQuery( "#main, #qunit-fixture" ).html( config.fixture );
	} else {
		var main = id( 'main' ) || id( 'qunit-fixture' );
		if ( main ) {
            // main.innerHTML = config.fixture;
		}
	}
}