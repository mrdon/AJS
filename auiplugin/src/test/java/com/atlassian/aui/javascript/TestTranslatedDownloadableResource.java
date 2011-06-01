package com.atlassian.aui.javascript;

import com.atlassian.sal.api.message.I18nResolver;
import junit.framework.TestCase;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.stub;

public class TestTranslatedDownloadableResource extends TestCase
{
    TranslatedDownloadableResource resource;
    I18nResolver i18n;

    @Override
    protected void setUp() throws Exception
    {
        super.setUp();

        i18n = mock(I18nResolver.class);
        resource = new TranslatedDownloadableResource(null, i18n);
    }

    public void testMultipleLines()
    {
        String key = "foo.bar";
        String key2 = "awesome.label";
        String function = "var someFunction = function() { return 0; };";

        String javascript = "var label = AJS.I18n.getText(\"" + key + "\");\n" +
            "var anotherLabel = AJS.I18n.getText(\"" + key2 + "\");\n" + function;

        stub(i18n.getRawText(key)).toReturn("Foo Bar");
        stub(i18n.getRawText(key2)).toReturn("Awesome");
        assertEquals("var label = \"Foo Bar\";\nvar anotherLabel = \"Awesome\";\n" + function, resource.transform(javascript));
    }

    public void testKeyWithSingleQuotes()
    {
        String javascript = "var t = AJS.I18n.getText('blah');";
        stub(i18n.getRawText("blah")).toReturn("Blah");

        assertEquals("var t = \"Blah\";", resource.transform(javascript));
    }

    public void testKeyWithoutDots()
    {
        String javascript = "var t = AJS.I18n.getText(\"blah\");";
        stub(i18n.getRawText("blah")).toReturn("Blah");

        assertEquals("var t = \"Blah\";", resource.transform(javascript));
    }

    public void testKeyWithHyphens()
    {
        String key = "foo-bar";
        String javascript = "var str = AJS.I18n.getText(\"" + key + "\");";
        stub(i18n.getRawText(key)).toReturn("Foo Bar");
        assertEquals("var str = \"Foo Bar\";", resource.transform(javascript));
    }

    public void testValueGetsEscaped()
    {
        String key = "apos.key";
        String javascript = "var str = AJS.I18n.getText(\"" + key + "\");";
        stub(i18n.getRawText(key)).toReturn("That's Awesome! \"Woot!\"");
        assertEquals("var str = \"That\\'s Awesome! \\\"Woot!\\\"\";", resource.transform(javascript));
    }

    public void testNonMatchingString()
    {
        String javascript = "var s = 0; var t = AJS.I18n;, var u = AJSI18ngetText(\"foo\")";
        assertEquals(javascript, resource.transform(javascript));

        // mismatched quotes
        javascript = "var str = AJS.I18n.getText('apos.key\");";
        assertEquals(javascript, resource.transform(javascript));
        javascript = "var str = AJS.I18n.getText(\"apos.key');";
        assertEquals(javascript, resource.transform(javascript));
    }

    public void testWhitespaceBetweenArgs()
    {
        stub(i18n.getRawText("blah")).toReturn("Blah");

        String javascript = "var t = AJS.I18n.getText( 'blah');";
        assertEquals("var t = \"Blah\";", resource.transform(javascript));

        javascript = "var t = AJS.I18n.getText('blah' );";
        assertEquals("var t = \"Blah\";", resource.transform(javascript));

        javascript = "var t = AJS.I18n.getText( 'blah' );";
        assertEquals("var t = \"Blah\";", resource.transform(javascript));

        javascript = "var t = AJS.I18n.getText('blah',1,2);";
        assertEquals("var t = AJS.format(\"Blah\",1,2);", resource.transform(javascript));

        javascript = "var t = AJS.I18n.getText('blah', 1,2);";
        assertEquals("var t = AJS.format(\"Blah\", 1,2);", resource.transform(javascript));

        javascript = "var t = AJS.I18n.getText('blah' , 1,2);";
        assertEquals("var t = AJS.format(\"Blah\", 1,2);", resource.transform(javascript));
    }

    public void testFormatMessage()
    {
        String key = "key.with.format";
        String translation = "Found {0} out of {1}";
        String javascript = "var t = AJS.I18n.getText(\"" + key  + "\", results, total);";
        stub(i18n.getRawText(key)).toReturn(translation);

        assertEquals("var t = AJS.format(\"" + translation + "\", results, total);", resource.transform(javascript));
    }

    public void testMessageWithQuotes()
    {
        String key = "key.with.quotes";
        String translation = "Could not find file ''{0}''.";
        String jsEscapedTranslation = "Could not find file \\'\\'{0}\\'\\'.";
        String javascript = "var t = AJS.I18n.getText(\"" + key  + "\", results, total);";
        stub(i18n.getRawText(key)).toReturn(translation);

        assertEquals("var t = AJS.format(\"" + jsEscapedTranslation + "\", results, total);", resource.transform(javascript));
    }

    public void testManuallyFormattedMessageDoesntChange()
    {
        String key = "key.with.format";
        String translation = "Found {0} out of {1}";
        String javascript = "var t = AJS.format(AJS.I18n.getText(\"" + key  + "\"), results, total);";
        stub(i18n.getRawText(key)).toReturn(translation);

        assertEquals("var t = AJS.format(\"" + translation + "\", results, total);", resource.transform(javascript));
    }
}
