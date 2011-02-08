package com.atlassian.aui.javascript;

import com.atlassian.plugin.elements.ResourceLocation;
import com.atlassian.plugin.servlet.DownloadableResource;
import com.atlassian.plugin.webresource.transformer.WebResourceTransformer;
import com.atlassian.sal.api.message.I18nResolver;
import org.dom4j.Element;

/**
 * Web resource transformer to translate i18n methods in JavaScript to the literal strings.
 * 
 * @see TranslatedDownloadableResource
 * @since 3.3.
 */
public class JsI18nTransformer implements WebResourceTransformer
{
    private final I18nResolver i18nResolver;

    public JsI18nTransformer(I18nResolver i18nResolver)
    {
        this.i18nResolver = i18nResolver;
    }

    public DownloadableResource transform(Element configElement, ResourceLocation location, String filePath, DownloadableResource nextResource)
    {
        return new TranslatedDownloadableResource(nextResource, i18nResolver);
    }

}
