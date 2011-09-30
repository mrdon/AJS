package com.atlassian.aui.javascript;

import com.atlassian.plugin.elements.ResourceLocation;
import com.atlassian.plugin.servlet.DownloadableResource;
import com.atlassian.plugin.webresource.transformer.WebResourceTransformer;
import com.atlassian.sal.api.message.I18nResolver;
import com.google.common.base.Function;
import org.dom4j.Element;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Web resource transformer to translate i18n methods in JavaScript to the literal strings.
 * 
 * This transforms the content by pattern matching on the text AJS.I18n.getText("key")
 * where key can only contain letters, numbers or dots and hyphens. It replaces this syntax with the literal
 * string translation before serving the resource.
 *
 * If a comma is found after the key instead of a closing brace ')', it will translate the string but also
 * wrap it in an AJS.format("translation", args) syntax so that the message can be formatted.
 *
 * @since 3.3.
 */
public class JsI18nTransformer implements WebResourceTransformer
{
    // Not a very sophisticated matcher. Doesn't check
    // for variables after the key if a comma has been detected.
    private static final Pattern PATTERN = Pattern.compile(
        "AJS\\.I18n\\.getText" +
        "\\(\\s*" + // start paren
        "(['\"])([\\w.-]+)\\1" + // single or double quoted word
        "\\s*([\\),])" // end paren, or start-of-args
    );

    private final I18nResolver i18nResolver;
    private final SearchAndReplacer grep;

    public JsI18nTransformer(I18nResolver i18nResolver)
    {
        this.i18nResolver = i18nResolver;
        Function<Matcher, String> replacer = new Function<Matcher, String>() {
            public String apply(Matcher matcher) {
                return doReplace(matcher);
            }
        };
        grep = new SearchAndReplacer(PATTERN, replacer);
    }

    private String doReplace(Matcher matcher) {
        String key = matcher.group(2);
        boolean format = ",".equals(matcher.group(3));

        StringBuilder result = new StringBuilder();
        if (format)
        {
            result.append("AJS.format(");
            result.append("\"").append(JavaScriptUtil.escape(i18nResolver.getRawText(key))).append("\"");
            result.append(",");
        }
        else
        {
            // no need to call AJS.format, format it ourselves by calling getText() instead of getRawText()
            result.append("\"").append(JavaScriptUtil.escape(i18nResolver.getText(key))).append("\"");
        }

        return result.toString();
    }

    public DownloadableResource transform(Element configElement, ResourceLocation location, String filePath, DownloadableResource nextResource)
    {
        return new SearchAndReplaceDownloadableResource(nextResource, grep);
    }

}
