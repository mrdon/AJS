package com.atlassian.aui.gwt.rpc.client;

import com.google.gwt.user.client.rpc.SerializationException;
import com.google.gwt.user.client.rpc.SerializationStreamFactory;
import com.google.gwt.user.client.rpc.SerializationStreamReader;

public class PreloadDataRetriever
{
    // TODO: better error handling
    public static Object loadLocal(String name, Object anyService)
    {
        String data = getString(name);
        if (data != null)
        {
            if (anyService instanceof SerializationStreamFactory)
            {
                try
                {
                    SerializationStreamFactory ssf = (SerializationStreamFactory) anyService;
                    SerializationStreamReader ssr = ssf.createStreamReader(data);
                    return ssr.readObject();
                }
                catch (SerializationException e)
                {
                    e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                }
            }
        }
        return null;
    }

    // Client side JSNI helper
    public static native String getString(String name) /*-{
      return eval("$wnd."+name);
    }-*/;
}

