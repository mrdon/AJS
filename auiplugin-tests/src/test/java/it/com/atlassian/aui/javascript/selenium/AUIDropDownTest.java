//package it.com.atlassian.aui.javascript.selenium;
//
//public class AUIDropDownTest extends AbstractAUISeleniumTestCase
//{
//
//    //Test to make sure dropdowns can be created correctly
//    public void testAUIDropDownCreate()
//    {
//        String creationString1 = client.getEval("window.AJS.$('#dropDown1').dropDown('Standard');");    //create dropdown 1
//        String creationString2 = client.getEval("window.AJS.$('#dropDown2').dropDown('Standard');");    //create dropdown 2
//
//        assertTrue("Dropdown1 not created successfully: " + creationString1 , creationString1.length() != 0);
//        assertTrue("Dropdown2 not created successfully: " + creationString2 , creationString2.length() != 0);
//    }
//
//    //Test to make sure dropdowns show correctly after being clicked, will fail if other dropdown is also showing while the other one is
//    public void testAUIDropDownShow()
//    {
//
//        client.click("css=div#dropDown1 .aui-dd-trigger");  //click on dropdown 1
//
//        assertThat.elementVisible("css=div#dropDown1 .aui-dropdown");
//        assertThat.elementNotVisible("css=div#dropDown2 .aui-dropdown");
//
//        client.click("css=div#dropDown2 .aui-dd-trigger");  //Click on dropdown 2
//
//        assertThat.elementVisible("css=div#dropDown2 .aui-dropdown");
//        assertThat.elementNotVisible("css=div#dropDown1 .aui-dropdown");
//    }
//
//    public void testAUIDropDownHide()
//    {
//
//        client.click("css=div#dropDown1 .aui-dd-trigger");    //click on a dropdown
//        client.click("css=body");   //click on the body element of the page to hide the dropdown
//
//        assertThat.elementNotVisible("css=div#dropDown1 .aui-dropdown");
//        assertThat.elementNotVisible("css=div#dropDown2 .aui-dropdown");
//
//        client.click("css=div#dropDown2 .aui-dd-trigger");    //click on a dropdown
//        client.click("css=body");   //click on the body element of the page to hide the dropdown
//
//        assertThat.elementNotVisible("css=div#dropDown1 .aui-dropdown");
//        assertThat.elementNotVisible("css=div#dropDown2 .aui-dropdown");
//    }
//
//}
