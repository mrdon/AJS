package com.atlassian.aui.test;

import com.atlassian.plugin.webresource.WebResourceManager;
import com.atlassian.templaterenderer.TemplateRenderer;
import com.google.common.collect.ImmutableMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;
import java.util.Map;

public class SandboxServlet extends HttpServlet
{
    private final WebResourceManager webResourceManager;
    private final TemplateRenderer templateRenderer;
    
    public SandboxServlet(WebResourceManager webResourceManager,
                          TemplateRenderer templateRenderer)
    {
        this.webResourceManager = webResourceManager;
        this.templateRenderer = templateRenderer;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
    {
        Map context = ImmutableMap.of("webResourceManager", webResourceManager);

        res.setContentType("text/html");
        render("sandbox/index-refapp.vm", context, res.getWriter());

        res.getWriter().close();
    }

    protected void render(String template, Map<String, Object> context, Writer output)
            throws IOException
    {
        templateRenderer.render(template, context, output);
    }
    
}
