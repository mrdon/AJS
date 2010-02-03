package com.atlassian.aui.gwt.rpc.server.verifier;

import com.atlassian.aui.gwt.rpc.server.RequestVerifier;
import com.atlassian.aui.gwt.security.client.RequireSystemAdministrator;
import com.atlassian.sal.api.user.UserManager;
import com.google.gwt.user.server.rpc.RPCRequest;
import com.google.gwt.user.server.rpc.RemoteServiceServlet;

import java.lang.reflect.Method;

public class SystemAdministratorVerifier implements RequestVerifier
{
    private final UserManager userManager;

    public SystemAdministratorVerifier(UserManager userManager)
    {
        this.userManager = userManager;
    }

    public void verify(RPCRequest request, RemoteServiceServlet servlet)
    {
        Method m = request.getMethod();
        if (m.getAnnotation(RequireSystemAdministrator.class) != null || servlet.getClass().getAnnotation(RequireSystemAdministrator.class) != null)
        {
            String user = userManager.getRemoteUsername();
            if (user == null || !userManager.isSystemAdmin(user))
            {
                throw new IllegalStateException("The user must be logged in and a system administrator");
            }
        }
    }
}
