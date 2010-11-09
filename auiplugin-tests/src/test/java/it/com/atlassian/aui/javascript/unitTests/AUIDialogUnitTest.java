package it.com.atlassian.aui.javascript.unitTests;

import com.atlassian.webdriver.utils.Check;
import com.atlassian.webdriver.utils.JavaScriptUtils;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;

import static org.junit.Assert.assertTrue;

public class AUIDialogUnitTest extends AUIWebDriverTestCase
{
    private static final String TEST_PAGE = "test-pages/dialog/dialog-test.html";

    @Before
    public void setUp()
    {
        openTestPage(TEST_PAGE);
    }

    //Test that AJS.dim() works
    @Test
    public void testDim()
    {
        JavaScriptUtils.execute("window.AJS.dim()", driver);
        assertTrue("Testing if aui-blanket exists after a dim", Check.elementExists(By.cssSelector(".aui-blanket")));
    }

    //    //Test that AJS.undim() works
    @Test
    public void testUndim()
    {
        JavaScriptUtils.execute("window.AJS.dim()", driver);
        assertTrue("Testing if aui-blanket exists after a dim", Check.elementExists(By.cssSelector(".aui-blanket")));
        JavaScriptUtils.execute("window.AJS.undim()", driver);
        assertTrue("Testing if aui-blanket doesn't exists after an undim", !Check.elementExists(By.cssSelector(".aui-blanket")));
    }

    @Test
    public void testPopupShow()
    {
        driver.findElement(By.id("popup-button")).click();
        assertTrue("popup div is visible after showing", Check.elementIsVisible(By.id("my-popup")));
        assertTrue("shadow-parent div is visible showing", Check.elementIsVisible(By.cssSelector(".aui-shadow")));
    }

    @Test
    public void testPopupHide()
    {
        driver.findElement(By.id("popup-button")).click();
        assertTrue("popup div is visible after the button click", Check.elementIsVisible(By.id("my-popup")));
        assertTrue("shadow-parent div is visible after button click", Check.elementIsVisible(By.cssSelector(".aui-shadow")));
        driver.findElement(By.cssSelector("body")).sendKeys(Keys.ESCAPE);
        assertTrue("popup div is not visible after the hiding", Check.elementIsVisible(By.id("my-popup"))==false);
        assertTrue("shadow-parent div is not visible after hiding", Check.elementIsVisible(By.cssSelector(".aui-shadow"))==false);

    }

    @Test
    public void testAddButton(){
        driver.findElement(By.id("test-add-button-button")).click();
        assertTrue("button panel is visible", Check.elementIsVisible(By.cssSelector("#test-button-dialog .dialog-button-panel")));
        assertTrue("button is visible", Check.elementIsVisible(By.cssSelector("#test-button-dialog .dialog-button-panel button.button-panel-button")));
        String buttonLabel=driver.findElement(By.cssSelector("#test-button-dialog .button-panel-button")).getText();
        assertTrue("button label is as expected: 'this is a button'", buttonLabel.equals("this is a button"));
    }

    @Test
    public void testAddPanel(){
        driver.findElement(By.id("test-add-panel-button")).click();
        assertTrue("dialog panel is visible", Check.elementIsVisible(By.cssSelector("#test-panel-dialog .dialog-page-body .dialog-panel-body")));
    }

}

