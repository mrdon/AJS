package it.com.atlassian.aui.javascript.selenium;

/**
 * Selenium test for events.js
 */
public class AUIEventTest extends AbstractAUISeleniumTestCase
{
    private static final String TEST_PAGE = "test-pages/index.html";
    /**
     * Make sure a simple bind and trigger works
     */
    public void testAJSeventBindsAndTriggers()
    {
        openTestPage(TEST_PAGE);
        client.waitForPageToLoad();
        client.getEval("window.testNum = 0");
        client.getEval("window.AJS.bind('abc-event', function(){window.testNum=window.testNum+1});");
        client.getEval("window.AJS.trigger('abc-event');");

        assertEquals("Trigger should be fired", "1", client.getEval("window.testNum"));
    }

    /**
     * Make sure a simple bind, unbind and trigger works
     */
    public void testAJSeventBindsAndTriggersWithUnbind()
    {
        openTestPage(TEST_PAGE);

        client.getEval("window.testNum = 0");
        client.getEval("window.AJS.bind('abc-event', function(){window.testNum=window.testNum+1});");
        client.getEval("window.AJS.trigger('abc-event');");

        client.getEval("window.AJS.unbind('abc-event');");
        client.getEval("window.AJS.trigger('abc-event');");

        assertEquals("Trigger should only be fired once", "1", client.getEval("window.testNum"));
    }


}