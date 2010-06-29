package it.com.atlassian.aui.javascript.selenium;

public class AUIUnitTest extends AbstractAUISeleniumTestCase
{
    public void testUnitTests(){
        openTestPage("js/tests/unit/test.html");

        client.waitForCondition("selenium.isElementPresent('qunit-testresult')");
        int failedTests = Integer.valueOf(client.getEval("window.AJS.$('li.fail li.fail').size()"));
        System.out.println(failedTests);
        if(failedTests!=0){
            fail("There are " + (failedTests) + " failed unit tests, to debug run: mvn refapp:run in the auiplugin-tests module then go to: http://localhost:9999/ajs/plugins/servlet/ajstest/js/tests/unit/test.html" );
        }

    }
}