package com.atlassian.javascript.ajs.selenium;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class AUITabsTest extends AUISeleniumTestCase
{

    // First pane of tabs should  be visible by default
    @Test
    public void testAUITabsFirstPaneVisibleByDefault()
    {
        openTestPage("test.html");  //open test page
        String creationString1 = client.getEval(" (window.AJS.$('.pane:first:visible',  window.AJS.$('div.h-tabs')))");    //create dropdown 1
        String creationString2 = client.getEval(" (window.AJS.$('.pane:first:visible',  window.AJS.$('div.v-tabs')))");     //create dropdown 2

        assertTrue("Horizontal1: first pane visible by default: " + creationString1 , !creationString1.isEmpty());
        assertTrue("Vertical1:  first pane visible by default: " + creationString2 , !creationString2.isEmpty());
    }

    // Only one pane should be visible
    @Test
    public void testAUITabsOnlyOnePaneVisible()
    {
        openTestPage("test.html");  //open test page
        String creationString1 = client.getEval(" (window.AJS.$('.pane:visible',  window.AJS.$('div.h-tabs')).size())");    //create dropdown 1
        String creationString2 = client.getEval(" (window.AJS.$('.pane:visible',  window.AJS.$('div.v-tabs')).size())");     //create dropdown 2

        assertTrue("Horizontal1: only one pane is visible: ", creationString1.equals("1"));
        assertTrue("Vertical1: only one pane is visible: ", creationString2.equals("1"));
    }

    // The visible pane should be the active-pane
    @Test
    public void testAUITabsVisiblePaneIsActive()
    {
        openTestPage("test.html");  //open test page
        String creationString1 = client.getEval(" (window.AJS.$('.pane:visible',  window.AJS.$('div.h-tabs')).hasClass('active-pane'))");
        String creationString2 = client.getEval(" (window.AJS.$('.pane:visible',  window.AJS.$('div.v-tabs')).hasClass('active-pane'))");

        assertTrue("Horizontal1: visible pane is active: ", creationString1.equals("true"));
        assertTrue("Vertical1: visible pane is active: ", creationString2.equals("true"));
    }

    // First  menu item should be active by default
    @Test
    public void testAUITabsFirstMenuItemActiveByDefault()
    {
        openTestPage("test.html");  //open test page
        String creationString1 = client.getEval(" (window.AJS.$('li:first',  window.AJS.$('div.h-tabs ul.tabs')).hasClass('active-tab'))");
        String creationString2 = client.getEval(" (window.AJS.$('li:first',  window.AJS.$('div.v-tabs ul.tabs')).hasClass('active-tab'))");
        assertTrue("Horizontal1: first menu item should be active by default: ", creationString1.equals("true"));
        assertTrue("Vertical1:  first menu item should be active by default: ", creationString2.equals("true"));
    }

    // Only one menu item should be active
    @Test
    public void testAUITabsOnlyOneMenuItemActive()
    {
        openTestPage("test.html");  //open test page
        String creationString1 = client.getEval(" (window.AJS.$('li:first',  window.AJS.$('div.h-tabs ul.tabs')).siblings().hasClass('active-tab'))");
        String creationString2 = client.getEval(" (window.AJS.$('li:first',  window.AJS.$('div.v-tabs ul.tabs')).siblings().hasClass('active-tab'))");
        assertTrue("Horizontal1: first menu item should be active by default: ", creationString1.equals("false"));
        assertTrue("Vertical1:  first menu item should be active by default: ", creationString2.equals("false"));
    }

    // clicking menu item should show associated pane and hide all others
    @Test
    public void testAUITabsClickingMenuItemShouldShowAssociatedPane()
    {
        openTestPage("test.html");  //open test page
        client.getEval("window.AJS.$('li a', window.AJS.$('div.h-tabs ul.tabs')).eq(2).trigger('click')");
        client.getEval("window.AJS.$('li a', window.AJS.$('div.v-tabs ul.tabs')).eq(2).trigger('click')");

        String creationString1 = client.getEval("window.AJS.$('div.pane', window.AJS.$('div.h-tabs')).eq(2).hasClass('active-pane');");
        String creationString2 = client.getEval("window.AJS.$('div.pane', window.AJS.$('div.v-tabs')).eq(2).hasClass('active-pane');");
        String creationString3 = client.getEval("window.AJS.$('div.pane', window.AJS.$('div.h-tabs')).eq(2).siblings().hasClass('active-pane')");
        String creationString4 = client.getEval("window.AJS.$('div.pane', window.AJS.$('div.v-tabs')).eq(2).siblings().hasClass('active-pane')");

        assertTrue("Horizontal1: clicking third menu item should show third pane: ", creationString1.equals("true"));
        assertTrue("Vertical1:  clicking third menu item should show third pane: ", creationString2.equals("true"));
        assertTrue("Horizontal1: no other panes should be visible except third pane: ", creationString3.equals("false"));
        assertTrue("Vertical1:  no other panes should be visible except third pane: ", creationString4.equals("false"));
    }


}
