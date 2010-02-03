package com.atlassian.aui.gwt.servlet;

import com.atlassian.aui.gwt.security.client.RequireAuthentication;
import com.atlassian.aui.gwt.security.client.RequireSystemAdministrator;
import com.atlassian.plugin.webresource.WebResourceManager;
import com.atlassian.plugins.rest.common.json.DefaultJaxbJsonMarshaller;
import com.atlassian.sal.api.user.UserManager;
import com.google.gwt.user.client.rpc.SerializationException;
import com.google.gwt.user.server.rpc.RPC;
import com.google.gwt.user.server.rpc.impl.ServerSerializationStreamWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.Callable;


public abstract class AbstractGwtServlet extends HttpServlet
{
    private final WebResourceManager webResourceManager;
    private final DefaultJaxbJsonMarshaller jsonMarshaller;
    private final UserManager userManager;

    public AbstractGwtServlet(WebResourceManager webResourceManager, UserManager userManager)
    {
        this.webResourceManager = webResourceManager;
        this.userManager = userManager;
        jsonMarshaller = new DefaultJaxbJsonMarshaller();
    }

    protected abstract String getTitle();

    protected abstract String getResource();

    protected abstract String getDecorator();

    protected abstract String getRootGwtId();

    protected Map<String, Object> getPreloadVariables(HttpServletRequest req)
    {
        return Collections.emptyMap();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        verifySecurity(req, resp);

        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println(
                "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n" +
                        "<html>\n" +
                        "  <head>\n" +
                        "    <meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\">\n" +
                        "      <meta name=\"decorator\" content=\"" + getDecorator() + "\" />\n" +
                        "      <title>" + getTitle() + "</title>\n");
        webResourceManager.requireResource(getResource());
        webResourceManager.requireResource("com.atlassian.auiplugin:aui-forms");
        out.println(
                "<script type=\"text/javascript\" language=\"javascript\">\n");
        for (Map.Entry<String, Object> entry : getPreloadVariables(req).entrySet())
        {
            String jsValue = serialize(entry.getValue());
            out.println(
                    "    var " + entry.getKey() + " = '" + jsValue + "';\n");
        }

        out.println(
                "    var gwtContextPath = '" + req.getContextPath() + "';\n" +
                        "</script>\n");
        out.println(
                "  </head>\n" +
                        "  <body>\n" +
                        "    <iframe src=\"javascript:''\" id=\"__gwt_historyFrame\" tabIndex='-1' style=\"position:absolute;width:0;height:0;border:0\"></iframe>\n" +
                        "    <div id=\"" + getRootGwtId() + "\" />" +
                        "  </body>\n" +
                        "</html>");

    }

    private void verifySecurity(HttpServletRequest req, HttpServletResponse res) throws IOException
    {
        if (getClass().getAnnotation(RequireAuthentication.class) != null)
        {
            if (userManager.getRemoteUsername() == null)
            {
                res.sendError(HttpServletResponse.SC_FORBIDDEN, "Must be logged in");
            }
        }
        if (getClass().getAnnotation(RequireSystemAdministrator.class) != null)
        {
            String user = userManager.getRemoteUsername();
            if (user == null || !userManager.isSystemAdmin(user))
            {
                res.sendError(HttpServletResponse.SC_FORBIDDEN, "The user must be logged in and a system administrator");
            }
        }
    }

    private String serialize(Object value)
    {
        ServerSerializationStreamWriter stream = new ServerSerializationStreamWriter(RPC.getDefaultSerializationPolicy());
        stream.prepareToWrite();
        try
        {
            stream.serializeValue(value, value.getClass());
        }
        catch (SerializationException e)
        {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
        return "//OK" + stream.toString();
    }
}
