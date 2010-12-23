package com.atlassian.aui.javascript;

import com.atlassian.plugin.servlet.DownloadableResource;
import com.atlassian.plugin.webresource.transformer.AbstractStringTransformedDownloadableResource;
import com.atlassian.sal.api.message.I18nResolver;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TranslatedDownloadableResource extends AbstractStringTransformedDownloadableResource
{
    private static final Pattern PATTERN = Pattern.compile("AJS\\.I18n\\.getText\\(\"([\\w.-]+)\"\\)");
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
            String key = matcher.group(1);
            // Since we can't pass in escaped quotes to appendReplacement, replace it
            // with empty string and append to buffer after.
            matcher.appendReplacement(output, "");
            output.append("\"" + JavaScriptUtil.escape(i18n.getText(key)) + "\"");
        }
        matcher.appendTail(output);
        return output.toString();
    }
}
