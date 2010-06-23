//package it.com.atlassian.aui.javascript.selenium;
//
//public class AUITabsTest extends AbstractAUISeleniumTestCase
//{
//    // First pane of tabs should  be visible by default
//    public void testAUITabsFirstPaneVisibleByDefault()
//    {
//        assertThat.elementVisible("css=div.horizontal-tabs #first");
//        assertThat.elementVisible("css=div.vertical-tabs #fifth");
//    }
//
//    // Only one pane should be visible
//    public void testAUITabsOnlyOnePaneVisible()
//    {
//        assertThat.elementVisible("css=div.horizontal-tabs #first");
//
//        assertThat.elementNotVisible("css=div.horizontal-tabs #second");
//        assertThat.elementNotVisible("css=div.horizontal-tabs #third");
//        assertThat.elementNotVisible("css=div.horizontal-tabs #fourth");
//
//        assertThat.elementVisible("css=div.vertical-tabs #fifth");
//
//        assertThat.elementNotVisible("css=div.vertical-tabs #sixth");
//        assertThat.elementNotVisible("css=div.vertical-tabs #seventh");
//        assertThat.elementNotVisible("css=div.vertical-tabs #eight");
//    }
//
//    // The visible pane should be the active-pane
//    public void testAUITabsVisiblePaneIsActive()
//    {
//
//        //check that the first horizontal pane is visible
//        assertThat.elementVisible("css=div.horizontal-tabs #first");
//
//        //check that the first horizontal pane is active
//        assertThat.attributeContainsValue("css=div.horizontal-tabs #first", "class", "active-pane");
//
//        //check that all other panes are not active
//        assertThat.attributeDoesntContainValue("css=div.horizontal-tabs #second", "class", "active-pane");
//        assertThat.attributeDoesntContainValue("css=div.horizontal-tabs #third", "class", "active-pane");
//        assertThat.attributeDoesntContainValue("css=div.horizontal-tabs #fourth", "class", "active-pane");
//
//        //check that the first vertical pane is visible
//        assertThat.elementVisible("css=div.vertical-tabs #fifth");
//
//        //check that the first vertical pane is active
//        assertThat.attributeContainsValue("css=div.vertical-tabs #fifth", "class", "active-pane");
//
//        //check that the rest of the panes are notactive
//        assertThat.attributeDoesntContainValue("css=div.vertical-tabs #sixth", "class", "active-pane");
//        assertThat.attributeDoesntContainValue("css=div.vertical-tabs #seventh", "class", "active-pane");
//        assertThat.attributeDoesntContainValue("css=div.vertical-tabs #eighth", "class", "active-pane");
//    }
//
//    // First  menu item should be active by default
//    public void testAUITabsFirstMenuItemActiveByDefault()
//    {
//        assertThat.attributeContainsValue("css=div.horizontal-tabs #first", "class", "active-pane");
//        assertThat.attributeContainsValue("css=div.vertical-tabs #fifth", "class", "active-pane");
//    }
//
//    // Only one menu item should be active
//    public void testAUITabsOnlyOneMenuItemActive()
//    {
//
//        //check tab first horizontal menu item is active
//        assertThat.attributeContainsValue("css=div.horizontal-tabs ul.tabs-menu li.menu-item:nth-child(1)", "class", "active-tab");
//
//        //check that the rest of the menu items arent active
//        assertThat.attributeDoesntContainValue("css=div.horizontal-tabs ul.tabs-menu li.menu-item:nth-child(2)", "class", "active-tab");
//        assertThat.attributeDoesntContainValue("css=div.horizontal-tabs ul.tabs-menu li.menu-item:nth-child(3)", "class", "active-tab");
//        assertThat.attributeDoesntContainValue("css=div.horizontal-tabs ul.tabs-menu li.menu-item:nth-child(4)", "class", "active-tab");
//
//        //check tab first vertical menu item is active
//        assertThat.attributeContainsValue("css=div.vertical-tabs ul.tabs-menu li.menu-item:nth-child(1)", "class", "active-tab");
//
//        //check that the rest of the menu items arent active
//        assertThat.attributeDoesntContainValue("css=div.vertical-tabs ul.tabs-menu li.menu-item:nth-child(2)", "class", "active-tab");
//        assertThat.attributeDoesntContainValue("css=div.vertical-tabs ul.tabs-menu li.menu-item:nth-child(3)", "class", "active-tab");
//        assertThat.attributeDoesntContainValue("css=div.vertical-tabs ul.tabs-menu li.menu-item:nth-child(4)", "class", "active-tab");
//    }
//
//    // clicking menu item should show associated pane and hide all others
//    public void testAUITabsClickingMenuItemShouldShowAssociatedPane()
//    {
//
//        client.click("css=div.horizontal-tabs ul.tabs-menu #menuSecond");
//
//        assertThat.elementVisible("css=div.horizontal-tabs #second");
//        assertThat.elementNotVisible("css=div.horizontal-tabs #first");
//        assertThat.elementNotVisible("css=div.horizontal-tabs #third");
//        assertThat.elementNotVisible("css=div.horizontal-tabs #fourth");
//    }
//
//
//}
