package com.atlassian.aui.gwt.rpc.client;

import com.google.gwt.user.client.rpc.ServiceDefTarget;

public class ServiceHelper
{
    public static <T> T configureService(T service, String moduleName, String serviceName)
    {
        String contextPath = PreloadDataRetriever.getString("gwtContextPath");
        ((ServiceDefTarget) service).setServiceEntryPoint(contextPath + "/plugins/servlet/" + moduleName + "/" + serviceName);
        return service;
    }
}
