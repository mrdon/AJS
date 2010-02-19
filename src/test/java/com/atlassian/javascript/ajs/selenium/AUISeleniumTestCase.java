package com.atlassian.javascript.ajs.selenium;

import com.atlassian.selenium.SeleniumConfiguration;
import com.atlassian.selenium.SeleniumTest;
import com.atlassian.javascript.ajs.selenium.client.Configuration;

public class AUISeleniumTestCase extends SeleniumTest
{
    public SeleniumConfiguration getSeleniumConfiguration()
    {
        return Configuration.getInstance();
    }

    public void openTestPage(String filename){
        client.open(filename);
    }

}
