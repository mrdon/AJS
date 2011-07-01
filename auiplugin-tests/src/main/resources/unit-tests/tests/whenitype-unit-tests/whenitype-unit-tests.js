module("WhenIType Keyboard Shortcuts Unit Tests");

var KEYS = { META: 224, ALT: 18, CTRL: 17 };


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

    var combinations = ["ctrl+c", "ctrl+a", "alt+a", "meta+?", "ctrl+?"];
    expect(combinations.length);

    jQuery.each(combinations, function(index, keyCombo) {

        AJS.whenIType.fromJSON([{
            "keys":[keyCombo],
            "context":"global",
            "op":"execute",
            "param":"emacsTestResults['" + keyCombo + "'] = true"
        }]);

        var event = jQuery.Event("keydown");

        var combination = keyCombo;

        while (combination.indexOf("+") !== -1) {
            var modifier = combination.substring(0, combination.indexOf("+"));
            event[modifier + "Key"] = true;
            combination = combination.replace(modifier + "+", "");
        }


        jQuery(document).trigger(event);

        event = jQuery.Event("keypress");
        event.which = combination.charCodeAt(0);

        jQuery(document).trigger(event);


        ok(emacsTestResults[keyCombo], "modifiers: Expected keyboard combination '" + keyCombo + "' to execute function");
    });
});

test("modifier keys for quick typers", function () {

    var combinations = ["alt+a", "ctrl+c", "meta+p"],
        modKeys = {"ctrl": KEYS.CTRL, "alt" : KEYS.ALT, "meta" : KEYS.META},
        event;

    expect(combinations.length);

    jQuery.each(combinations, function(index, keyCombo) {

        AJS.whenIType.fromJSON([{
            "keys":[keyCombo],
            "context":"global",
            "op":"execute",
            "param":"emacsTestResults['" + keyCombo + "'] = true"
        }]);

        var modifier = keyCombo.substring(0, keyCombo.indexOf("+")),
            letter = keyCombo.replace(modifier + "+", "");

        event = jQuery.Event("keydown");
        event.which = modKeys[modifier];
        jQuery(document).trigger(event);

        var event = jQuery.Event("keypress");
            event.which = letter.charCodeAt(0);
            jQuery(document).trigger(event);
            ok(emacsTestResults[keyCombo], "quick modifiers: Expected keyboard combination '" + keyCombo + "' to execute function");

        // tidy up.
        event = jQuery.Event("keyup");
        event.which = modKeys[modifier];
        jQuery(document).trigger(event);

    });

});

test("keys preceded with ctrl modifier", function() {

    var combinations = ["c", "?"],
        event;

    expect(combinations.length);

    jQuery.each(combinations, function(index, key) {

        AJS.whenIType.fromJSON([{
            "keys":[key],
            "context":"global",
            "op":"execute",
            "param":"ok(false, 'The key \"" + key + "\" should not have fired an event')"
        }]);

        event = jQuery.Event("keydown");
        event.which = KEYS.CTRL;
        jQuery(document).trigger(event);

        event = jQuery.Event("keypress");
        event.which = key.charCodeAt(0);
        jQuery(document).trigger(event);

        // tidy up.
        event = jQuery.Event("keyup");
        event.which = KEYS.CTRL;
        jQuery(document).trigger(event);

        ok(true);

    });
});


test("keys pressed with alt modifier should not execute", function() {

    var combinations = ["c", "?", "a"],
        event;

    expect(combinations.length)

    jQuery.each(combinations, function(index, key) {
        AJS.whenIType.fromJSON([{
            "keys":[key],
            "context":"global",
            "op":"execute",
            "param":"ok(false, 'The key \"" + key + "\" should not have fired an event')"
        }]);

        event = jQuery.Event("keydown");
        event.which = KEYS.ALT;
        jQuery(document).trigger(event);


        event = jQuery.Event("keypress");
        event.which = key.charCodeAt(0);
        jQuery(document).trigger(event);

        // tidy up.
        event = jQuery.Event("keyup");
        event.which = KEYS.ALT;
        jQuery(document).trigger(event);

        ok(true);
    });

});

test("keys pressed with meta modifier should not execute", function() {

    var combinations = ["c", "?", "a"],
        event;

    expect(combinations.length);

    jQuery.each(combinations, function(index, key) {
        AJS.whenIType.fromJSON([{
            "keys": [key],
            "context":"global",
            "op":"execute",
            "param":"ok(false, 'The key \"" + key + "\" should not have fired an event')"
        }]);

        event = jQuery.Event("keydown");
        event.which = KEYS.META;
        jQuery(document).trigger(event);

        event = jQuery.Event("keypress");
        event.which = key.charCodeAt(0);
        jQuery(document).trigger(event);

        // tidy up.
        event = jQuery.Event("keyup");
        event.which = KEYS.META;
        jQuery(document).trigger(event);

        ok(true);

    });

});   
    