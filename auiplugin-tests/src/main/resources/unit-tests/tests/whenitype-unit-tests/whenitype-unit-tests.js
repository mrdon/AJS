module("WhenIType Keyboard Shortcuts Unit Tests");

test("emacs", function() {

    var combinations = ["abc", "abcd", "zzz", "p" , "abcdefghijklmnopqrstuwxyz"];

    jQuery.each(combinations, function(idx, str) {
        AJS.whenIType.fromJSON([{
            "keys":[str],
            "context":"global",
            "op":"execute",
            "param":"emacsTestResults['" + idx + "'] = true"
        }]);

        jQuery.each(str, function (i) {
            var event = jQuery.Event("keypress");
            event.which = str.charCodeAt(i);
            jQuery(document).trigger(event);
            if (i !== str.length-1) {
                ok(!emacsTestResults[idx], "Keyboard combination '" + str + "' should not execute function until full string is "
                        + "typed, not on letter '" + str.charAt(i) + "' (index: " + i + ")");
            }
        });
        ok(emacsTestResults[idx], "emacs: - Expected keyboard combination '" + str + "' to execute function");
    });
});


test("special keys", function () {

    var specialKeys = {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
			96: "0", 97: "1", 98: "2", 91: "meta", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll",
            188: ",", 190: ".", 191: "/", 224: "meta", 219: '[', 221: ']'
		};

    jQuery.each(specialKeys, function(keyCode, name) {

        AJS.whenIType.fromJSON([{
            "keys":[name],
            "context":"global",
            "op":"execute",
            "param":"emacsTestResults['" + name + "'] = true"
        }]);

        var event = jQuery.Event("keypress");
        event.which = keyCode;
        jQuery(document).trigger(event);

        ok(emacsTestResults[name], "specials: Expected keyboard combination '" + name + "' to execute function");
    });


});


test("shift keys", function () {

    var shiftNums = {
        "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
        "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
        ".": ">",  "/": "?",  "\\": "|"
    };

    jQuery.each(shiftNums, function(shiftChar, name) {

        AJS.whenIType.fromJSON([{
            "keys":[name],
            "context":"global",
            "op":"execute",
            "param":"emacsTestResults['" + name + "'] = true"
        }]);



        var event = jQuery.Event("keypress");
        event.which = shiftChar.charCodeAt(0);
        event.shiftKey = true;
        jQuery(document).trigger(event);

        ok(emacsTestResults[name], "shift: Expected keyboard combination '" + name + "' to execute function");
    });

});

test("modifier keys", function () {

    var combinations = ["ctrl+c", "ctrl+a", "alt+a", "alt+a", "meta+?", "ctrl+?"];

    jQuery.each(combinations, function(keyCode, name) {

        AJS.whenIType.fromJSON([{
            "keys":[name],
            "context":"global",
            "op":"execute",
            "param":"emacsTestResults['" + name + "'] = true"
        }]);

        var event = jQuery.Event("keydown");

        var combination = name;

        while (combination.indexOf("+") !== -1) {
            var modifier = combination.substring(0, combination.indexOf("+"));
            event[modifier + "Key"] = true;
            combination = combination.replace(modifier + "+", "");
        }


        jQuery(document).trigger(event);

        event = jQuery.Event("keypress");
        event.which = combination.charCodeAt(0);

        jQuery(document).trigger(event);


        ok(emacsTestResults[name], "modifiers: Expected keyboard combination '" + name + "' to execute function");
    });
});

asyncTest("modifier keys for quick typers", function () {

    var combinations = ["alt+a", "ctrl+c", "meta+p"],
        modKeys = {"ctrl": 17, "alt" : 18, "meta" : 224},
        index = 0;

    function runTest(combination) {
        AJS.whenIType.fromJSON([{
            "keys":[combination],
            "context":"global",
            "op":"execute",
            "param":"emacsTestResults['" + combination + "'] = true"
        }]);


        var modifier = combination.substring(0, combination.indexOf("+")),
            letter = combination.replace(modifier + "+", "");

        var event = jQuery.Event("keydown");
        event.which = modKeys[modifier];

        jQuery(document).trigger(event);

        window.setTimeout(function () {

            var event = jQuery.Event("keypress");
            event.which = letter.charCodeAt(0);
            jQuery(document).trigger(event);
            ok(emacsTestResults[combination], "quick modifiers: Expected keyboard combination '" + combination + "' to execute function");
            index++;
            if (combinations[index]) {
                runTest(combinations[index]);
            } else {
                start();
            }
        }, 200);
    }

    runTest(combinations[index]);
});

// FLAKY TEST! QUARANTINED, breaks the build.
// https://studio.atlassian.com/browse/AJS-603
/*
asyncTest("keys proceeded with ctrl modifier", function() {

    var combinations = ["c", "?"],
        index = 0;

    function runTest(combination) {


        AJS.whenIType.fromJSON([{
            "keys":[combination],
            "context":"global",
            "op":"execute",
            "param":"emacsTestResults['" + combination + "'] = true"
        }]);

        var event = jQuery.Event("keydown");
        event.which = 17;
        jQuery(document).trigger(event);

        window.setTimeout(function () {

            var event = jQuery.Event("keypress");
            event.which = combination.charCodeAt(0);
            jQuery(document).trigger(event);

            ok(!emacsTestResults[combination], "ctrl: Expected keyboard combination '" + combination + "' NOT to execute function");

            index++;

            if (combinations[index]) {
                runTest(combinations[index]);
            } else {
                start();
            }
        }, 200);
    }

    runTest(combinations[index]);

});
*/

asyncTest("keys proceeded with alt modifier", function() {

    var combinations = ["c", "?", "a"],
        index = 0;

    function runTest(combination) {


        AJS.whenIType.fromJSON([{
            "keys":[combination],
            "context":"global",
            "op":"execute",
            "param":"emacsTestResults['" + combination + "'] = true"
        }]);

        var event = jQuery.Event("keydown");
        event.which = 18;
        jQuery(document).trigger(event);

        window.setTimeout(function () {

            var event = jQuery.Event("keypress");
            event.which = combination.charCodeAt(0);
            jQuery(document).trigger(event);

            ok(!emacsTestResults[combination], "alt: Expected keyboard combination '" + combination + "' NOT to execute function");

            index++;

            if (combinations[index]) {
                runTest(combinations[index]);
            } else {
                start();
            }
        }, 200);
    }

    runTest(combinations[index]);

});

// FLAKY TEST! QUARANTINED, breaks the build constantly.
// https://studio.atlassian.com/browse/AJS-603
//asyncTest("keys proceeded with meta modifier", function() {
//
//    var combinations = ["c", "?", "a"],
//        index = 0;
//
//    function runTest(combination) {
//
//
//        AJS.whenIType.fromJSON([{
//            "keys":[combination],
//            "context":"global",
//            "op":"execute",
//            "param":"emacsTestResults['" + combination + "'] = true"
//        }]);
//
//        var event = jQuery.Event("keydown");
//        event.which = 224;
//        jQuery(document).trigger(event);
//
//        window.setTimeout(function () {
//
//            var event = jQuery.Event("keypress");
//            event.which = combination.charCodeAt(0);
//            jQuery(document).trigger(event);
//
//            ok(!emacsTestResults[combination], "meta: Expected keyboard combination '" + combination + "' NOT to execute function");
//
//            index++;
//
//            if (combinations[index]) {
//                runTest(combinations[index]);
//            } else {
//                start();
//            }
//        }, 200);
//    }
//
//    runTest(combinations[index]);
//
//});   
    