module("Events Unit Tests");

test("Event Binding", function() {
    
    //scope the test variables so they dont leak into other tests.
    var test1 = this;
    test1.testNum = 0;
    window.AJS.bind('test1-event', function(){
        test1.testNum = test1.testNum + 1;
    });
    window.AJS.trigger('test1-event');
    ok(test1.testNum==1, "Test that AJS.bind works, expecting test1.testNum == 1");
});

test("Event Unbinding", function(){
    
    //scope the test variables so they dont leak into other tests.
    var test2 = this;
    test2.testNum = 0;
    window.AJS.bind('test2-event', function(){
        test2.testNum = test2.testNum + 1;
    });
    window.AJS.trigger('test2-event');
    ok(test2.testNum==1, "Test that AJS.bind works, expecting test2.testNum == 1");
    
    window.AJS.unbind('test2-event');
    window.AJS.trigger('test2-event');
    
    ok(test2.testNum==1, "test that event unbinded properly and that test2.testNum is still the same (test2.testnum == 1)");
});