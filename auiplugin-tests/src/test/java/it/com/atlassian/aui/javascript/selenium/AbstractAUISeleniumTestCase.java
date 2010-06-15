package it.com.atlassian.aui.javascript.selenium;

import com.atlassian.selenium.SeleniumAssertions;
import com.atlassian.selenium.SeleniumClient;
import com.atlassian.selenium.SeleniumConfiguration;
import junit.framework.TestCase;

import static com.atlassian.selenium.browsers.AutoInstallClient.assertThat;
import static com.atlassian.selenium.browsers.AutoInstallClient.seleniumClient;
import static com.atlassian.selenium.browsers.AutoInstallClient.seleniumConfiguration;

public abstract class AbstractAUISeleniumTestCase extends TestCase
{
    protected static SeleniumAssertions assertThat;
    protected static SeleniumClient client;
    protected static SeleniumConfiguration config;

    static
    {
        if (System.getProperty("baseurl") == null)
        {
            System.setProperty("baseurl", "http://localhost:9999/ajs");
        }
        assertThat = assertThat();
        client = seleniumClient();
        config = seleniumConfiguration();
    }

    public void openTestPage()
    {
        client.open("plugins/servlet/ajstest/test.html");
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
