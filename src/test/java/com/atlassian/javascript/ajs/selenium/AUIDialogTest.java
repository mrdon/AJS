package com.atlassian.javascript.ajs.selenium;

public class AUIDialogTest extends AUISeleniumTestCase
{
    public void setUpTest(boolean needToCreateObjects)
    {
        openTestPage("test.html");
        addHTMLtoElement("body", "    <form action=\"\" class=\"aui\">\n" +
                "        <fieldset>\n" +
                "            <legend>Dialog</legend>\n" +
                "            <input id=\"testButton\" name=\"testButton\" type=\"button\" class=\"button\" value=\"Click Me\">\n" +
                "        </fieldset>\n" +
                "    </form>");

        if (needToCreateObjects)
        {
            runMultiLineJavascript("window.AJS.$(\"#testButton\").click(function() {\n" +
                    "    popup = new window.AJS.Dialog(860, 530, 'testClick');\n" +
                    "    popup.addHeader(\"Dialog - Page 0\");\n" +
                    "    popup.addPanel(\"Panel 1\", \"panel1\");\n" +
                    "    popup.getCurrentPanel().html(\"Some content for panel 1\");\n" +
                    "    popup.addPanel(\"Panel 2\", \"panel1\");\n" +
                    "    popup.getCurrentPanel().html(\"Some content for panel 2\");\n" +
                    "    popup.addButton(\"Next\", function (dialog) {\n" +
                    "        dialog.nextPage();\n" +
                    "    });\n" +
                    "    popup.addButton(\"Cancel\", function (dialog) {\n" +
                    "        dialog.hide();\n" +
                    "    });\n" +
                    "    popup.addPage();\n" +
                    "    popup.page[1].addHeader(\"Dialog - Page 1\");\n" +
                    "    popup.page[1].addPanel(\"SinglePanel\", \"singlePanel\");\n" +
                    "    popup.getCurrentPanel().html(\"Some content for the only panel on Page 1\");\n" +
                    "    popup.page[1].addButton(\"Previous\", function(dialog) {\n" +
                    "       dialog.prevPage();\n" +
                    "    });\n" +
                    "    popup.page[1].addButton(\"Cancel\", function (dialog) {\n" +
                    "        dialog.hide();\n" +
                    "    });\n" +
                    "    popup.gotoPage(0);\n" +
                    "    popup.gotoPanel(0);\n" +
                    "    popup.show();\n" +
                    "});");
            client.getEval("manualPopup = new window.AJS.Dialog(860, 530, 'test-dialog')");
        }
    }
    //Test if dialogs can be initialises properly
    public void testDialogInitialisation()
    {
        setUpTest(false);

        String creationString1 = client.getEval("var popup = new window.AJS.Dialog(860, 530)");

        assertTrue("Popup not created properly", creationString1 != null);

    }

    //Test that dialogs are not positioned off-screen
    public void testDialogBindsToButton()
    {
        setUpTest(true);
        client.getEval("manualPopup.show()"); //show the popup
        client.windowMaximize();    //Maximize the the window
        client.getEval("document.documentElement.scrollTop = 10000;");  //scroll window to the top

        String top = client.getEval("window.AJS.$('#test-dialog').offset().top");
        String scrollTop = client.getEval("document.documentElement.scrollTop");

        assertTrue("Popup is being drawn off the top of the screen", Integer.parseInt(top) > Integer.parseInt(scrollTop));
    }

        //Test that dialogs are not positioned off-screen
    public void testDialogPosition()
    {
        setUpTest(true);
        client.click("testButton");
        assertThat.elementVisible("testClick");
    }
}
