package com.atlassian.javascript.ajs;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * A simple servlet that serves resources from the class path. Use this servlet to map
 * urls to this library's resources.
 *
 * The path to the resource is expected to be everthing after the servlet path.
 */
public class AjsServlet extends HttpServlet
{

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        String resource = getResourcePath(request);

        InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream(resource);
        if(in == null)
        {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "The resource: " + resource + " was not found.");
            return;
        }

        OutputStream out = response.getOutputStream();
        try
        {
            copyAndCloseQuietly(in, out);
        }
        catch (IOException e)
        {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error serving the requested file");
        }

    }

    private String getResourcePath(HttpServletRequest request)
    {
        String servletPath = request.getServletPath();
        String resource = request.getRequestURI();
        resource = resource.substring(resource.indexOf(servletPath) + servletPath.length());
        if(resource.startsWith("/"))
        {
            resource = resource.substring(1);
        }
        return resource;
    }


    private static final int DEFAULT_BUFFER_SIZE = 1024 * 4;

    // Mostly copied from org.apache.commons.io.IOUtils to simplify dependencies on this module.
    private long copyAndCloseQuietly(InputStream in, OutputStream out) throws IOException
    {
        try
        {
            byte[] buffer = new byte[DEFAULT_BUFFER_SIZE];
            long count = 0;
            int n = 0;
            while (-1 != (n = in.read(buffer))) {
                out.write(buffer, 0, n);
                count += n;
            }
            return count;
        }
        finally
        {
            try
            {
                if (in != null) in.close();
                out.flush();
            }
            catch (IOException e)
            {
                // ignore
            }
        }
    }
}
