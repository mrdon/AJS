module("Unit Tests for AJS.template");

test("html escaping", function() {
    var template = AJS.template("Hello, {name}. Welcome to {application}.<br>");

    equals(template.fill({name:"\"O'Foo\"", application:"<JIRA & Confluence>"}).toString(),
            "Hello, &quot;O&#39;Foo&quot;. Welcome to &lt;JIRA &amp; Confluence&gt;.<br>")
});
