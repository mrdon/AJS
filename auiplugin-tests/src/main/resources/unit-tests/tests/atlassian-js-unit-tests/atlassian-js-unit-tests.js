module("Unit Tests for atlassian.js");

test("AJS.version", function() {
    ok( typeof AJS.version === "string", " AJS.version should return a string (in REFAPP it will be the generic project.version string)");
});

test("alphanum", function() {
    function assertAlphaNum(a, b, expected) {
        var actual = AJS.alphanum(a, b);
        equals(actual, expected, "alphanum test\n" + a + "\n" + b);

        // try in reverse
        actual = AJS.alphanum(b, a);
        equals(actual, expected * -1, "alphanum (reverse) test\n" + b + "\n" + a)
    }

    assertAlphaNum("a", "a", 0);
    assertAlphaNum("a", "b", -1);
    assertAlphaNum("b", "a", 1);

    assertAlphaNum("a0", "a1", -1);
    assertAlphaNum("a10", "a1", 1);
    assertAlphaNum("a2", "a1", 1);
    assertAlphaNum("a2", "a10", -1);
});

test("escapeHtml", function() {

    equals(AJS.escapeHtml("a \" doublequote"), "a &quot; doublequote");
    equals(AJS.escapeHtml("a ' singlequote"), "a &#39; singlequote");
    equals(AJS.escapeHtml("a < lessthan"), "a &lt; lessthan");
    equals(AJS.escapeHtml("a > greaterthan"), "a &gt; greaterthan");
    equals(AJS.escapeHtml("a & ampersand"), "a &amp; ampersand");

    equals(AJS.escapeHtml("foo"), "foo");

    equals(AJS.escapeHtml("<foo>"), "&lt;foo&gt;");
    equals(AJS.escapeHtml("as<foo>as"), "as&lt;foo&gt;as");

    equals(AJS.escapeHtml("some <input class=\"foo\" value='bar&wombat'> thing"), "some &lt;input class=&quot;foo&quot; value=&#39;bar&amp;wombat&#39;&gt; thing");
});

test("contextPath", function() {
    equals(AJS.contextPath(), "/ajs");
    ok(/http:\/\/[a-z]*(:[0-9]+)?\/ajs/.test(AJS.baseURL()));
});
