//package it.com.atlassian.aui.javascript.selenium;
//
///**
// * Selenium test for events.js
// */
//public class AUIEventTest extends AbstractAUISeleniumTestCase
//{
//    /**
//     * Make sure a simple bind and trigger works
//     */
//    public void testAJSeventBindsAndTriggers()
//    {
////        openTestPage();
//        client.getEval("window.AJS.bind('abc-event', window.registerTest);");
//        client.getEval("window.AJS.trigger('abc-event');");
//        assertEquals("Trigger should be fired", "1", client.getEval("window.testResult"));
//    }
//
//    /**
//     * Make sure a simple bind, unbind and trigger works
//     */
//    public void testAJSeventBindsAndTriggersWithUnbind()
//    {
////        openTestPage();
//        client.getEval("window.AJS.bind('abc-event', window.registerTest);");
//        client.getEval("window.AJS.trigger('abc-event');");
//        assertEquals("Trigger should be fired", "1", client.getEval("window.testResult"));
//        client.getEval("window.AJS.unbind('abc-event');");
//        client.getEval("window.AJS.trigger('abc-event');");
//        assertEquals("Trigger should be fired only once", "1", client.getEval("window.testResult"));
//    }
//
//
//}