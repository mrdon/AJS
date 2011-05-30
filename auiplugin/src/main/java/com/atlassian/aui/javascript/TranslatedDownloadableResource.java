package com.atlassian.aui.javascript;

import com.atlassian.plugin.servlet.DownloadableResource;
import com.atlassian.plugin.webresource.transformer.AbstractStringTransformedDownloadableResource;
import com.atlassian.sal.api.message.I18nResolver;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * A DownloadableResource that transforms the content by pattern matching on the text AJS.I18n.getText("key")
 * where key can only contain letters, numbers or dots and hyphens. It replaces this syntax with the literal
 * string translation before serving the resource.
 *
 * If a comma is found after the key instead of a closing brace ')', it will translate the string but also
 * wrap it in an AJS.format("translation", args) syntax so that the message can be formatted.
 *
 * @since 3.3.
 */
public class TranslatedDownloadableResource extends AbstractStringTransformedDownloadableResource
{
    // Not a very sophisticated matcher. Doesn't check
    // for variables after the key if a comma has been detected.
    private static final Pattern PATTERN = Pattern.compile(
        "AJS\\.I18n\\.getText" +
        "\\(\\s*" + // start paren
        "(['\"])([\\w.-]+)\\1" + // single or double quoted word
        "\\s*([\\),])" // end paren, or start-of-args
    );
    private final I18nResolver i18n;

    public TranslatedDownloadableResource(DownloadableResource originalResource, I18nResolver i18n)
    {
        super(originalResource);
        this.i18n = i18n;
    }

    @Override
    protected String transform(String originalContent)
    {
        Matcher matcher = PATTERN.matcher(originalContent);
        StringBuffer output = new StringBuffer();
        while (matcher.find())
        {
            String key = matcher.group(2);
            boolean format = ",".equals(matcher.group(3));

            // Since we can't pass in escaped quotes to appendReplacement, replace it
            // with empty string and append to buffer after.
            matcher.appendReplacement(output, "");

            if (format)
            {
                output.append("AJS.format(");
            }

            output.append("\"").append(JavaScriptUtil.escape(i18n.getRawText(key))).append("\"");

            if (format)
            {
                output.append(",");
            }
        }
        matcher.appendTail(output);
        return output.toString();
    }
}
