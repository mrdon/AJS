package com.atlassian.javascript.ajs.selenium;

import com.atlassian.javascript.ajs.selenium.client.Configuration;
import com.atlassian.selenium.SeleniumConfiguration;
import com.atlassian.selenium.SeleniumTest;

public class AUISeleniumTestCase extends SeleniumTest
{
    public SeleniumConfiguration getSeleniumConfiguration()
    {
        return Configuration.getInstance();
    }

    public void openTestPage(String filename)
    {
        client.open(filename);
    }

    public void addHTMLtoElement(String element, String html)
    {
        html = html.replaceAll("\n", "");
        String runString = "window.AJS.$('" + element + "').append('" + html + "')";
        client.getEval(runString);
    }

    public void runMultiLineJavascript(String runString)
    {
        runString = runString.replaceAll("\n", "");
        client.getEval(runString);
    }

}
