package it.com.atlassian.aui.javascript.integrationTests.experimental;

import it.com.atlassian.aui.javascript.integrationTests.AbstractAUISeleniumTestCase;

public class AUIExperimentalSeleniumQUnitTest extends AbstractAUISeleniumTestCase
{
    public void testExperimentalExample()
    {
        openQunitTestPage("experimental-example");
        runQunitTests("experimental-example");
    }

    //HELPER FUNCTIONS

    //runs qunit tests on the page, component argument for reporting purposes only
    private void runQunitTests(String component)
    {
        client.waitForCondition("selenium.isElementPresent('qunit-testresult')");
        client.waitForCondition("setTimeout('return true', 3000)");
        int numberOfFailedTests = Integer.valueOf(client.getEval("window.AJS.$('li.fail li.fail').size()"));
        if (numberOfFailedTests != 0)
        {
            String failedTests[] = getFailedAssertionsText();
            String failedTestListString = "";

            for (int i = 0; i < failedTests.length; i++)
            {

                failedTestListString = failedTestListString + "FAILED! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + failedTests[i] + "\n";
            }

            fail("There are " + (numberOfFailedTests) + " failed unit tests for" + component + " \n\n" + failedTestListString);
        }
    }

    //Function to retrive all the failed assertions and place them in an array to be used for reporting
    private String[] getFailedAssertionsText()
    {

        String result = client.getEval("var string = \"\";function getText(){window.AJS.$('li.fail li.fail').each( function(){string = string + window.AJS.$(this).text() + \"|\";});return string;} getText();");

        String resultSplit[];

        resultSplit = result.split("\\|");


        return resultSplit;
    }

    //Opens a qunit test page for the specified component (assumes correct test file structure)
    private void openQunitTestPage(String component)
    {
        openTestPage("unit-tests/tests/experimental/" + component + "-unit-tests/" + component + "-unit-tests.html");
    }


}
