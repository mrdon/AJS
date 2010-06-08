package it.com.atlassian.aui.javascript.selenium;

public class AUIComponentTestTemplate extends AbstractAUISeleniumTestCase
{

    public void setUpTest(boolean needToCreateObjects)
    {
        openTestPage();
        addHTMLtoElement("body",
                "html goes here"
        );

        if (needToCreateObjects)
        {

        }

    }

    public void testSample()
    {
        setUpTest(false);
    }
}
