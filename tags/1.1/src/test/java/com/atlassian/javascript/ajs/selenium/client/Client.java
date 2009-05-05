package com.atlassian.javascript.ajs.selenium.client;

import com.atlassian.selenium.SeleniumClient;
import com.atlassian.selenium.SeleniumConfiguration;

public class Client extends SeleniumClient
{
    private static final Client CLIENT = new Client(Configuration.getInstance());

    static
    {
        CLIENT.start();
    }

    public Client(SeleniumConfiguration config)
    {
        super(config);
    }

    public static Client getInstance()
    {
        return CLIENT;
    }
}
