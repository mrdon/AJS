package com.atlassian.aui.javascript;

import junit.framework.TestCase;

import java.io.IOException;
import java.io.StringWriter;

// since there is so much escaping going on, we represent
// "\" (backslash) in the text as "|" (pipe) for clarity
public class TestJavaScriptUtil extends TestCase
{
    public void testDoesntEscape() throws Exception
    {
        checkEscape("some plain text", "some plain text");
        checkEscape("some printable ascii !%*+{}~", "some printable ascii !%*+{}~");
    }

    public void testEscapeQoutes() throws Exception
    {
        checkEscape("a double \" quote", "a double |\" quote");
        checkEscape("a single ' quote", "a single |' quote");
    }

    public void testEscapeSlashes() throws Exception
    {
        checkEscape("a raw | slash", "a raw || slash");
        checkEscape("two || slashes", "two |||| slashes");
    }

    public void testUnicode() throws Exception
    {
        checkEscape("some unicode: armenian \u0531 cherokee \u13A0", "some unicode: armenian |u0531 cherokee |u13A0");
    }

    public void testNewlines() throws Exception
    {
        checkEscape("line1\nline2", "line1|nline2");
        checkEscape("line1\rline2", "line1|rline2");
        checkEscape("line1\u2028line2", "line1|u2028line2");
        checkEscape("line1\u2029line2", "line1|u2029line2");
        checkEscape("line1\r\nline2", "line1|r|nline2");
    }

    public void testAngleBracketsEscaped() throws Exception
    {
        checkEscape("<script></script>", "|u003cscript>|u003c\\/script>");
        checkEscape("<fake></fake>", "|u003cfake>|u003c\\/fake>");
    }

    private void checkEscape(String input, String expectedOutput) throws IOException
    {
        input = input.replace('|', '\\');
        expectedOutput = expectedOutput.replace('|', '\\');

        StringWriter buf = new StringWriter();
        JavaScriptUtil.escape(buf, input);
        assertEquals(expectedOutput, buf.toString());
    }
}
