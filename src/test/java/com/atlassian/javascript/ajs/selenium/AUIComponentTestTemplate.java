package com.atlassian.javascript.ajs.selenium;

public class AUIComponentTestTemplate extends AUISeleniumTestCase
{

    public void setUpTest(boolean needToCreateObjects)
    {
        openTestPage("test.html");
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
