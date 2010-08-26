package com.atlassian.aui.gwt.rpc.server.verifier;

import com.atlassian.aui.gwt.rpc.server.RequestVerifier;
import com.atlassian.aui.gwt.security.client.RequireAuthentication;
import com.atlassian.sal.api.user.UserManager;
import com.google.gwt.user.server.rpc.RPCRequest;
import com.google.gwt.user.server.rpc.RemoteServiceServlet;

import java.lang.reflect.Method;

public class AuthenticatedVerifier implements RequestVerifier
{
    private final UserManager userManager;

    public AuthenticatedVerifier(UserManager userManager)
    {
        this.userManager = userManager;
    }

    public void verify(RPCRequest request, RemoteServiceServlet servlet)
    {
        Method m = request.getMethod();
        if (m.getAnnotation(RequireAuthentication.class) != null || servlet.getClass().getAnnotation(RequireAuthentication.class) != null)
        {
            if (userManager.getRemoteUsername() == null)
            {
                throw new IllegalStateException("The user must be logged in");
            }
        }
    }

}
