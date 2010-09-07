package it.com.atlassian.aui.javascript.unitTests;

import com.atlassian.webdriver.AtlassianWebDriver;
import junit.framework.TestCase;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.openqa.selenium.WebDriver;
import webdriver.browsers.WebdriverBrowserAutoInstall;

import static org.junit.Assert.*;

public abstract class AUIWebDriverTestCase
{
    protected static WebDriver driver;
    protected static final int POS_THRESHOLD = 20;  //Used to calculate the threshold range for element positioning

    static
    {
        if (System.getProperty("baseurl") == null)
        {
            System.setProperty("baseurl", "http://localhost:9999/ajs");
        }
    }

    @BeforeClass
    public static void startWebDriver()
    {
        driver = WebdriverBrowserAutoInstall.getDriver();
    }

    @AfterClass
    public static void stopWebDriver()
    {
        AtlassianWebDriver.quitDriver();
    }

    public void openTestPage(String page)
    {
        driver.get(System.getProperty("baseurl") + "/plugins/servlet/ajstest/" + page);
    }

    public boolean isWithinRange(int num, int min, int max)
    {
        return (num > min && num < max);
    }

}