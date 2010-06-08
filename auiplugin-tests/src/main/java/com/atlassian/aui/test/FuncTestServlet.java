package com.atlassian.aui.test;



import com.atlassian.plugin.Plugin;
import com.atlassian.plugin.PluginAccessor;
import com.atlassian.plugin.webresource.WebResourceManager;
import org.apache.commons.io.IOUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 *
 */
public class FuncTestServlet extends HttpServlet
{
    private final WebResourceManager webResourceManager;
    private final Plugin plugin;

    public FuncTestServlet(WebResourceManager webResourceManager, PluginAccessor pluginAccessor)
    {
        this.webResourceManager = webResourceManager;
        this.plugin = pluginAccessor.getPlugin("auiplugin-tests");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        webResourceManager.requireResource("com.atlassian.auiplugin:ajs");
        webResourceManager.requireResource("auiplugin-tests:ajs-tests");
        resp.setContentType("text/html");
        InputStream in = plugin.getResourceAsStream(req.getPathInfo());
        OutputStream out = resp.getOutputStream();
        IOUtils.copy(in, out);
        out.close();
    }
}
