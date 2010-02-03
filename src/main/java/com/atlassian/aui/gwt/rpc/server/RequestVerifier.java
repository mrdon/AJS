package com.atlassian.aui.gwt.rpc.server;

import com.google.gwt.user.server.rpc.RPCRequest;
import com.google.gwt.user.server.rpc.RemoteServiceServlet;

public interface RequestVerifier
{
    void verify(RPCRequest request, RemoteServiceServlet servlet);
}
