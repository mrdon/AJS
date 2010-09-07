package it.com.atlassian.aui.javascript.unitTests;

import com.atlassian.webdriver.AtlassianWebDriver;
import com.atlassian.webdriver.utils.Check;
import com.atlassian.webdriver.utils.JavaScriptUtils;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.RenderedWebElement;
import org.openqa.selenium.WebElement;
import webdriver.browsers.WebdriverBrowserAutoInstall;

import static org.junit.Assert.*;

public class AUIDialogUnitTests extends AUIWebDriverTestCase
{
    private static final String TEST_PAGE = "test-pages/dialog/dialog-test.html";

    @Before
    public void setUp(){
        openTestPage(TEST_PAGE);
    }

    //Test that AJS.dim() works
    @Test
    public void testDim()
    {
        JavaScriptUtils.execute("window.AJS.dim()", driver);
        assertTrue(Check.elementExists(By.cssSelector(".aui-blanket")));
    }

//    //Test that AJS.undim() works
    @Test
    public void testUndim()
    {
        JavaScriptUtils.execute("window.AJS.dim()", driver);
        assertTrue(Check.elementExists(By.cssSelector(".aui-blanket")));
        JavaScriptUtils.execute("window.AJS.undim()", driver);
        assertTrue(!Check.elementExists(By.cssSelector(".aui-blanket")));
    }

}

