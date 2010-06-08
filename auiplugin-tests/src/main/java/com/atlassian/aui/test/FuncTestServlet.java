package com.atlassian.aui.test;



import com.atlassian.plugin.Plugin;
import com.atlassian.plugin.PluginAccessor;
import com.atlassian.plugin.webresource.WebResourceManager;
import org.apache.commons.io.IOUtils;
import org.osgi.framework.BundleContext;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Writer;
import java.util.Enumeration;

/**
 *
 */
public class FuncTestServlet extends HttpServlet
{
    private final WebResourceManager webResourceManager;
    private final Plugin plugin;
    private final BundleContext bundleContext;

    public FuncTestServlet(WebResourceManager webResourceManager, PluginAccessor pluginAccessor, BundleContext bundleContext)
    {
        this.webResourceManager = webResourceManager;
        this.bundleContext = bundleContext;
        this.plugin = pluginAccessor.getPlugin("auiplugin-tests");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        webResourceManager.requireResource("com.atlassian.auiplugin:ajs");
        webResourceManager.requireResource("auiplugin-tests:ajs-tests");
        resp.setContentType("text/html");
        if (req.getPathInfo().endsWith("/"))
        {
            displayIndex(req, resp);
        }
        else
        {
            InputStream in = plugin.getResourceAsStream(req.getPathInfo());
            OutputStream out = resp.getOutputStream();
            IOUtils.copy(in, out);
            out.close();
        }
    }

    private void displayIndex(HttpServletRequest req, HttpServletResponse resp) throws IOException
    {
        Enumeration<String> e = bundleContext.getBundle().getEntryPaths(req.getPathInfo());
        Writer writer = resp.getWriter();
        writer.append("<ul>");
        writer.append("<li><a href=\"../\">..</li>\n");

        while (e.hasMoreElements())
        {
            String path = e.nextElement();
            String file = path.substring(req.getPathInfo().length() - 1);
            if (file.length() > 0)
            {
                if (file.contains("/"))
                {
                    file = file.substring(0, file.indexOf('/')) + "/";
                }
                writer.append("<li><a href=\"" + file + "\">" + file + "</a></li>\n");
            }
        }
        writer.append("</ul>");
        writer.close();
    }
}
