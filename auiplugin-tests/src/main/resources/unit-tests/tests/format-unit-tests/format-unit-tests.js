module("Format Unit Tests");

test("AJS.Format with 1 parameter", function() {
       var testFormat = AJS.format("hello {0}", "world"); 
       ok(testFormat=="hello world", "expected AJS.format to return: 'hello world'" );
       ok(testFormat!="hello {0}", "AJS.format rendered formatting successfully");
});

test("AJS.Format with 2 parameters", function() {
       var testFormat = AJS.format("hello {0} {1}", "world", "again"); 
       ok(testFormat=="hello world again", "expected AJS.format to return: 'hello world again'" );
       ok(testFormat!="hello {0} {1}", "AJS.format rendered formatting successfully");
});

test("AJS.Format with 3 parameters", function() {
       var testFormat = AJS.format("hello {0} {1} {2}", "world", "again", "!"); 
       ok(testFormat=="hello world again !", "expected AJS.format to return: 'hello world again !'" );
       ok(testFormat!="hello {0} {1} {2}", "AJS.format rendered formatting successfully");
});

test("AJS.Format with 4 parameters", function() {
       var testFormat = AJS.format("hello {0} {1} {2} {3}", "world", "again", "!", "test"); 
       ok(testFormat=="hello world again ! test", "expected AJS.format to return: 'hello world again ! test'" );
       ok(testFormat!="hello {0} {1} {2} {3}", "AJS.format rendered formatting successfully");
});

test("AJS.Format with symbols", function() {
       var testFormat = AJS.format("hello {0}", "!@#$%^&*()"); 
       ok(testFormat=="hello !@#$%^&*()", "expected AJS.format to return: 'hello !@#$%^&*()'" );
       ok(testFormat!="hello {0}", "AJS.format rendered formatting successfully");
});

test("AJS.Format with curly braces", function() {
       var testFormat = AJS.format("hello {0}", "{}"); 
       ok(testFormat=="hello {}", "expected AJS.format to return: 'hello {}'" );
       ok(testFormat!="hello {0}", "AJS.format rendered formatting successfully");
});

test("AJS.Format with repeated parameters", function() {
       var testFormat = AJS.format("hello {0}, {0}, {0}", "world"); 
       ok(testFormat=="hello world, world, world", "expected AJS.format to return: 'hello world, world, world'" );
       ok(testFormat!="hello {0}, {0}, {0}", "AJS.format rendered formatting successfully");
});

test("AJS.Format with apostrophe", function() {
       var testFormat = AJS.format("hello '{0}' {0} {0}", "world"); 
       ok(testFormat=="hello {0} world world", "expected AJS.format to return: 'hello {0} world world'" );
       ok(testFormat!="hello world world", "AJS.format escaped curly braces successfully");
});

test("AJS.Format with very long parameters", function() {
       var testFormat = AJS.format("hello {0}", "this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long "); 
       ok(testFormat=="hello this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long ", "expected AJS.format to return: 'hello this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long this parameter is very long '" );
});