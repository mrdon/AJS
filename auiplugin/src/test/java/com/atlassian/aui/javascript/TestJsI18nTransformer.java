package com.atlassian.aui.javascript;

import com.atlassian.sal.api.message.I18nResolver;
import junit.framework.TestCase;

import java.text.MessageFormat;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.stub;

public class TestJsI18nTransformer extends TestCase
{
    JsI18nTransformer transformer;
    I18nResolver i18n;

    @Override
    protected void setUp() throws Exception
    {
        super.setUp();

        i18n = mock(I18nResolver.class);
        transformer = new JsI18nTransformer(i18n);
    }

    public void testMultipleLines()
    {
        String key = "foo.bar";
        String key2 = "awesome.label";
        String function = "var someFunction = function() { return 0; };";

        String javascript = "var label = AJS.I18n.getText(\"" + key + "\");\n" +
            "var anotherLabel = AJS.I18n.getText(\"" + key2 + "\");\n" + function;

        stubTranslation(key, "Foo Bar");
        stubTranslation(key2, "Awesome");
        assertEquals("var label = \"Foo Bar\";\nvar anotherLabel = \"Awesome\";\n" + function, transform(javascript));
    }

    public void testKeyWithSingleQuotes()
    {
        String javascript = "var t = AJS.I18n.getText('blah');";
        stubTranslation("blah", "Blah");

        assertEquals("var t = \"Blah\";", transform(javascript));
    }

    public void testKeyWithoutDots()
    {
        String javascript = "var t = AJS.I18n.getText(\"blah\");";
        stubTranslation("blah", "Blah");

        assertEquals("var t = \"Blah\";", transform(javascript));
    }

    public void testKeyWithHyphens()
    {
        String key = "foo-bar";
        String javascript = "var str = AJS.I18n.getText(\"" + key + "\");";
        stubTranslation(key, "Foo Bar");
        assertEquals("var str = \"Foo Bar\";", transform(javascript));
    }

    public void testValueGetsEscaped()
    {
        String key = "apos.key";
        String javascript = "var str = AJS.I18n.getText(\"" + key + "\");";
        stubTranslation(key, "That''s Awesome! \"Woot!\"");
        assertEquals("var str = \"That\\'s Awesome! \\\"Woot!\\\"\";", transform(javascript));
    }

    public void testNonMatchingString()
    {
        String javascript = "var s = 0; var t = AJS.I18n;, var u = AJSI18ngetText(\"foo\")";
        assertEquals(javascript, transform(javascript));

        // mismatched quotes
        javascript = "var str = AJS.I18n.getText('apos.key\");";
        assertEquals(javascript, transform(javascript));
        javascript = "var str = AJS.I18n.getText(\"apos.key');";
        assertEquals(javascript, transform(javascript));
    }

    public void testWhitespaceBetweenArgs()
    {
        stubTranslation("blah", "Blah");

        String javascript = "var t = AJS.I18n.getText( 'blah');";
        assertEquals("var t = \"Blah\";", transform(javascript));

        javascript = "var t = AJS.I18n.getText('blah' );";
        assertEquals("var t = \"Blah\";", transform(javascript));

        javascript = "var t = AJS.I18n.getText( 'blah' );";
        assertEquals("var t = \"Blah\";", transform(javascript));

        javascript = "var t = AJS.I18n.getText('blah',1,2);";
        assertEquals("var t = AJS.format(\"Blah\",1,2);", transform(javascript));

        javascript = "var t = AJS.I18n.getText('blah', 1,2);";
        assertEquals("var t = AJS.format(\"Blah\", 1,2);", transform(javascript));

        javascript = "var t = AJS.I18n.getText('blah' , 1,2);";
        assertEquals("var t = AJS.format(\"Blah\", 1,2);", transform(javascript));
    }

    public void testFormatMessage()
    {
        String key = "key.with.format";
        String translation = "Found {0} out of {1}";
        String javascript = "var t = AJS.I18n.getText(\"" + key  + "\", results, total);";
        stubTranslation(key, translation);

        assertEquals("var t = AJS.format(\"" + translation + "\", results, total);", transform(javascript));
    }

    public void testMessageWithQuotes()
    {
        String key = "key.with.quotes";
        String translation = "Could not find file ''{0}''.";
        String jsEscapedTranslation = "Could not find file \\'\\'{0}\\'\\'.";
        String javascript = "var t = AJS.I18n.getText(\"" + key  + "\", results, total);";
        stubTranslation(key, translation);

        assertEquals("var t = AJS.format(\"" + jsEscapedTranslation + "\", results, total);", transform(javascript));
    }

    public void testFormattedMessageWithArgs()
    {
        String key = "key.with.format";
        String translation = "Found {0} out of {1}";
        String javascript = "var t = AJS.I18n.getText(\"" + key  + "\", results, total);";
        stubTranslation(key, translation);

        assertEquals("var t = AJS.format(\"" + translation + "\", results, total);", transform(javascript));
    }

    public void testFormattedMessageNoArgs()
    {
        String key = "key.with.format";
        String translation = "open-curly-zero '{0}' open-curley-one '{1}'";
        String javascript = "var t = AJS.I18n.getText(\"" + key  + "\");";
        stubTranslation(key, translation);

        assertEquals("var t = \"open-curly-zero {0} open-curley-one {1}\";", transform(javascript));
    }

    private void stubTranslation(final String key, final String raw)
    {
        stub(i18n.getRawText(key)).toReturn(raw);
        stub(i18n.getText(key)).toReturn(MessageFormat.format(raw, new Object[0]));
    }

    private String transform(String javascript) {
        SearchAndReplaceDownloadableResource resource =
                (SearchAndReplaceDownloadableResource) transformer.transform(null, null, null, null);
        return resource.transform(javascript);
    }

}
