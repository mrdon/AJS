package com.atlassian.aui.test.experimental;


import com.atlassian.plugin.Plugin;
import com.atlassian.plugin.PluginAccessor;
import com.atlassian.plugin.webresource.WebResourceManager;
import com.atlassian.templaterenderer.TemplateRenderer;
import com.google.common.collect.ImmutableMap;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Writer;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Experimental func test servlet is a simple servelet for listing tests
 * in the experimental space and serving up the html pages for the tests.
 */
public class ExperimentalFuncTestServlet extends HttpServlet {
    private final WebResourceManager webResourceManager;
    private final Plugin plugin;
    private final TemplateRenderer templateRenderer;

    public ExperimentalFuncTestServlet(WebResourceManager webResourceManager,
            PluginAccessor pluginAccessor, TemplateRenderer templateRenderer) {
        this.webResourceManager = webResourceManager;
        this.plugin = pluginAccessor.getPlugin("auiplugin-tests");
        this.templateRenderer = templateRenderer;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        webResourceManager.requireResource("com.atlassian.auiplugin:ajs");
        
        // conditional resource loading for testing
        if(req.getPathInfo().contains("experimental-example-unit-test"))
        {
            webResourceManager.requireResource("com.atlassian.auiplugin:aui-experimental-example");
        }

        if (req.getPathInfo().endsWith("/"))
        {
            try
            {
                displayIndex(req, resp);
            }
            catch (URISyntaxException e)
            {
                throw new IOException(e);
            }
        }
        else
        {
            String thisPathArray[] = req.getPathInfo().split("/");

            if (thisPathArray[thisPathArray.length - 1].contains("index"))
            {
                resp.setContentType("text/html");
                webResourceManager.requireResource("auiplugin-tests:test-common");
                URL url = plugin.getResource("unit-tests/tests/experimental");
                File file = new File(url.getFile());
                String[] testPaths = file.list(new FilenameFilter()
                {
                    public boolean accept(final File checkFile, final String s)
                    {
                        File f = new File(checkFile, s);
                        return f.isDirectory() && s.contains("-unit-tests");
                    }
                });

                Map<String,Object> context = ImmutableMap.<String,Object>of("testPaths", testPaths);
                templateRenderer.render("unit-tests/tests/experimental/index.vm",
                        context, resp.getWriter());
                return;

            }

            // only include qunit when necessary
            if (req.getPathInfo().contains("unit-tests"))
            {
                webResourceManager.requireResource("auiplugin-tests:qunit");



                //only require the test resource if we are in a subpath
                if (thisPathArray.length > 4)
                {
                    String thisSubPath = thisPathArray[thisPathArray.length - 2];
                    webResourceManager.requireResource("auiplugin-tests:" + thisSubPath);
                }

                //include all unit test js files if viewing allTests page
                if (thisPathArray[thisPathArray.length - 1].contains("allTests"))
                {
                    webResourceManager.requireResource("auiplugin-tests:all-experimental-unit-tests");
                }

            }
            if (req.getPathInfo().contains("test-pages"))
            {
                webResourceManager.requireResource("auiplugin-tests:test-common");
            }
            
            String path = req.getPathInfo();
            if (path.endsWith(".html"))
            {
                resp.setContentType("text/html");
            }
            else if (path.endsWith(".js"))
            {
                resp.setContentType("text/javascript");
            }
            else if (path.endsWith(".css"))
            {
                resp.setContentType("text/css");
            }
            InputStream in = plugin.getResourceAsStream(path);
            OutputStream out = resp.getOutputStream();
            IOUtils.copy(in, out);
            out.close();
        }
    }

    private void displayIndex(HttpServletRequest req, HttpServletResponse resp) throws IOException, URISyntaxException {
        resp.setContentType("text/html");
        Writer writer = resp.getWriter();
        URL fileURL = plugin.getResource(req.getPathInfo());
        if (fileURL == null)
        {
            resp.sendError(404);
            return;
        }
        else if ("file".equals(fileURL.getProtocol().toLowerCase()))
        {
            File file = new File(fileURL.toURI());
            writer.append("<ul>");
            writer.append("<li><a href=\"../\">..</li>\n");
            for (File kid : file.listFiles())
            {
                String name = kid.getName();
                if (kid.isDirectory())
                {
                    name += "/";
                }
                writer.append("<li><a href=\"" + name + "\">" + name + "</a></li>\n");
            }
            writer.append("</ul>");
            writer.close();
        }
    }
}
