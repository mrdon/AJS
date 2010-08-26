package com.atlassian.javascript.ajs.selenium;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class AUIDropDownTest extends AUISeleniumTestCase
{
     public void setUpTest(boolean needToCreateObjects)
     {
        openTestPage("test.html");  //open test page
        addHTMLtoElement("body", "" +
                "    <div id= \"dropDown1\">\n" +
                "        <li class=\"aui-dd-parent\">\n" +
                "            <a href=\"#\" class=\"aui-dd-trigger\">A Dropdown</a>\n" +
                "            <ul class=\"aui-dropdown\">\n" +
                "                <li><a href=\"#\">A menu item</a></li>\n" +
                "                <li><a href=\"#\">Another menu item</a></li>\n" +
                "                <li><a href=\"#\">Third menu item</a></li>\n" +
                "                <li><a href=\"#\">Menu item 4</a></li>\n" +
                "                <li><a href=\"#\">A menu item</a></li>\n" +
                "                <li><a href=\"#\">Another menu item</a></li>\n" +
                "                <li><a href=\"#\">Third menu item</a></li>\n" +
                "                <li><a href=\"#\">Menu item 4</a></li>\n" +
                "                <li><a href=\"#\">A menu item</a></li>\n" +
                "                <li><a href=\"#\">Another menu item</a></li>\n" +
                "                <li><a href=\"#\">Third menu item</a></li>\n" +
                "                <li><a href=\"#\">Menu item 4</a></li>\n" +
                "                <li><a href=\"#\">A menu item</a></li>\n" +
                "                <li><a href=\"#\">Another menu item</a></li>\n" +
                "                <li><a href=\"#\">Third menu item</a></li>\n" +
                "                <li><a href=\"#\">Menu item 4</a></li>\n" +
                "                <li><a href=\"#\">A menu item</a></li>\n" +
                "                <li><a href=\"#\">Another menu item</a></li>\n" +
                "                <li><a href=\"#\">Third menu item</a></li>\n" +
                "                <li><a href=\"#\">Menu item 4</a></li>\n" +
                "                <li><a href=\"#\">A menu item</a></li>\n" +
                "                <li><a href=\"#\">Another menu item</a></li>\n" +
                "                <li><a href=\"#\">Third menu item</a></li>\n" +
                "                <li><a href=\"#\">Menu item 4</a></li>\n" +
                "                <li><a href=\"#\">A menu item</a></li>\n" +
                "                <li><a href=\"#\">Another menu item</a></li>\n" +
                "                <li><a href=\"#\">Third menu item</a></li>\n" +
                "                <li><a href=\"#\">Menu item 4</a></li>\n" +
                "\n" +
                "            </ul>\n" +
                "        </li>\n" +
                "    </div>\n" +
                "    <div id = \"dropDown2\">\n" +
                "        <li class=\"aui-dd-parent\">\n" +
                "            <a href=\"#\" class=\"aui-dd-trigger\">A Second Dropdown</a>\n" +
                "            <ul class=\"aui-dropdown\">\n" +
                "                <li><a href=\"#\">A menu item in the Second Dropdown</a></li>\n" +
                "                <li><a href=\"#\">Another menu item</a></li>\n" +
                "                <li><a href=\"#\">Third menu item</a></li>\n" +
                "                <li><a href=\"#\">Menu item 4</a></li>\n" +
                "            </ul>\n" +
                "        </li>\n" +
                "    </div>");

        if(needToCreateObjects){
            client.getEval("window.AJS.$('#dropDown1').dropDown('Standard');");    //create dropdown 1
            client.getEval("window.AJS.$('#dropDown2').dropDown('Standard');");    //create dropdown 2
        }

     }


    //Test to make sure dropdowns can be created correctly
    public void testAUIDropDownCreate()
    {
        setUpTest(false);
        String creationString1 = client.getEval("window.AJS.$('#dropDown1').dropDown('Standard');");    //create dropdown 1
        String creationString2 = client.getEval("window.AJS.$('#dropDown2').dropDown('Standard');");    //create dropdown 2

        assertTrue("Dropdown1 not created successfully: " + creationString1 , creationString1.length() != 0);
        assertTrue("Dropdown2 not created successfully: " + creationString2 , creationString2.length() != 0);
    }

    //Test to make sure dropdowns show correctly after being clicked, will fail if other dropdown is also showing while the other one is
    public void testAUIDropDownShow()
    {
        setUpTest(true);

        client.click("css=div#dropDown1 .aui-dd-trigger");  //click on dropdown 1

        assertThat.elementVisible("css=div#dropDown1 .aui-dropdown");
        assertThat.elementNotVisible("css=div#dropDown2 .aui-dropdown");

        client.click("css=div#dropDown2 .aui-dd-trigger");  //Click on dropdown 2

        assertThat.elementVisible("css=div#dropDown2 .aui-dropdown");
        assertThat.elementNotVisible("css=div#dropDown1 .aui-dropdown");
    }

    public void testAUIDropDownHide()
    {
        setUpTest(true);

        client.click("css=div#dropDown1 .aui-dd-trigger");    //click on a dropdown
        client.click("css=body");   //click on the body element of the page to hide the dropdown

        assertThat.elementNotVisible("css=div#dropDown1 .aui-dropdown");
        assertThat.elementNotVisible("css=div#dropDown2 .aui-dropdown");

        client.click("css=div#dropDown2 .aui-dd-trigger");    //click on a dropdown
        client.click("css=body");   //click on the body element of the page to hide the dropdown

        assertThat.elementNotVisible("css=div#dropDown1 .aui-dropdown");
        assertThat.elementNotVisible("css=div#dropDown2 .aui-dropdown");
    }

}
