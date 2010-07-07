package it.com.atlassian.aui.javascript.integrationTests;

public class AUIUnitTest extends AbstractAUISeleniumTestCase
{
    public void testUnitTests(){
        openTestPage("/unit-tests/tests/whenitype.html");

        client.waitForCondition("selenium.isElementPresent('qunit-testresult')");
        int numberOfFailedTests = Integer.valueOf(client.getEval("window.AJS.$('li.fail li.fail').size()"));
        String failedTests = client.getEval("window.AJS.$('li.fail li.fail')");
        if(numberOfFailedTests!=0){
            fail("There are " + (numberOfFailedTests) + " failed unit tests, to debug run: mvn refapp:run in the auiplugin-tests module then go to: http://localhost:9999/ajs/plugins/servlet/ajstest/js/tests/unit/test.html \n "+ failedTests );
        }

    }
}
