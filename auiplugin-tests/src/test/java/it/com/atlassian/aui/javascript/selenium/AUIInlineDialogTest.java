//package it.com.atlassian.aui.javascript.selenium;
//
//public class AUIInlineDialogTest extends AbstractAUISeleniumTestCase
//{
//
//    //Test to make sure InlineDialogs can be created correctly
//    public void testAUIInlineDialogCreate()
//    {
//        String creationString1 = createInlineDialog("#inlineDialog1", "1", "'dialog-content.html'", null);    //create inline-dialog 1
//        String creationString2 = createInlineDialog("#inlineDialog2", "2", "'dialog-content.html'", null);    //create inline-dialog 2
//
//        assertTrue("InlineDialog1 not created successfully: " + creationString1, creationString1.length() != 0);
//        assertTrue("InlineDialog2 not created successfully: " + creationString2, creationString2.length() != 0);
//    }
//
//    public void testAUIInlineDialogNoBind()
//    {
//        String creationString = createInlineDialog("#inlineDialog1", "1", "'dialog-content.html'", "{noBind:'true'}");    //create inline-dialog 1
//
//        assertTrue("InlineDialog1 not created successfully: " + creationString, creationString.length() != 0);
//    }
//
//    public void testAUIInlineDialogNoBindClick()
//    {
//        createInlineDialog("#inlineDialog1", "1", "'dialog-content.html'", "{noBind:'true'}");    //create inline-dialog 1
//        client.click("css=a#inlineDialog1");
//        assertThat.elementNotVisible("css=div#inline-dialog-1");
//    }
//
//    public void testAUIInlineDialogStandardClick() throws InterruptedException
//    {
//
//        client.click("css=a#inlineDialog1");
//        assertThat.elementVisible("css=div#inline-dialog-1");
//        assertThat.elementNotVisible("css=div#inline-dialog-2");
//
//        client.click("css=a#inlineDialog2");
//        Thread.sleep(500);
//        assertThat.elementVisible("css=div#inline-dialog-2");
//        assertThat.elementNotVisible("css=div#inline-dialog-1");
//
//    }
//
////    public void testAUIInlineDialogFunctionPass()
////    {
////        openTestPage("test.html");  //open test page
////        createInlineDialog("#inlineDialog1","1","function(content, trigger, showPopup){window.AJS.$(trigger).append('<div id= \"testFunction\"></div>');}", null);    //create inline-dialog 1
////        client.click("inlineDialog1");
////        client.waitForCondition("selenium.isElementPresent('testFunction')");
////        assertThat.elementPresent("testFunction");
////
////    }
//
//    private String createInlineDialog(String element, String number, String contents, String arguments)
//    {
//        String runString = "window.AJS.InlineDialog(window.AJS.$('" + element + "'), " + number + "," + contents;
//        if (arguments != null)
//        {
//            runString = runString + ", " + arguments + ");";
//        }
//        else
//        {
//            runString = runString + ");";
//        }
//        System.out.println(runString);
//        return client.getEval(runString);
//    }
//}
