package com.atlassian.javascript.ajs.selenium.client;

import com.atlassian.selenium.AbstractSeleniumConfiguration;

public class Configuration extends AbstractSeleniumConfiguration
{

    private static final String LOCATION = System.getProperty("selenium.location", "localhost");
    private static final int PORT = Integer.getInteger("selenium.port", 4444);
    private static final String BROWSER = System.getProperty("selenium.browser", "*firefox /Applications/Firefox2.app/Contents/MacOS/firefox-bin");
    private static final String BASE_URL = System.getProperty("baseurl", "http://localhost:9999/ajs/"); // You must have a trailing '/' otherwise Selenium will strip the context path


    //Use these lines if testing with IE
    //private static final String BASE_URL = System.getProperty("baseurl", "http://172.20.6.44:9999/ajs/"); // You must have a trailing '/' otherwise Selenium will strip the context path
    //private static final String LOCATION = System.getProperty("selenium.location", "172.20.6.35");
    //private static final String BROWSER = System.getProperty("selenium.browser", "*iexploreproxy C:/Program Files/Internet Explorer/iexplore.exe");


    private static final long MAX_WAIT_TIME = 10000;
    private static final long CONDITION_CHECK_INTERVAL = 100;

    private static final Configuration INSTANCE = new Configuration();

    private Configuration() { }

    public static Configuration getInstance()
    {
        return INSTANCE;
    }

    public String getServerLocation()
    {
        return LOCATION;
    }

    public int getServerPort()
    {
        return PORT;
    }

    public String getBrowserStartString()
    {
        return BROWSER;
    }

    public String getBaseUrl()
    {
        return BASE_URL;
    }

    public boolean getStartSeleniumServer()
    {
        return false;
    }

    public long getActionWait()
    {
        return MAX_WAIT_TIME;
    }

    public long getPageLoadWait()
    {
        return MAX_WAIT_TIME;
    }

    public long getConditionCheckInterval()
    {
        return CONDITION_CHECK_INTERVAL;
    }
}
