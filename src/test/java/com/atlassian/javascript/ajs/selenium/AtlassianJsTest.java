package com.atlassian.javascript.ajs.selenium;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

import java.util.Enumeration;

public class AtlassianJsTest extends AUISeleniumTestCase {

    public void testAtlassianJs() throws Throwable {
        TestSuite testSuite = buildTestSuite();

        Enumeration<Test> testEnumeration = testSuite.tests();
        while (testEnumeration.hasMoreElements()) {

            TestCase test = (TestCase) testEnumeration.nextElement();
            test.runBare();
        }
    }

    private TestSuite buildTestSuite() {
        TestSuite suite = new TestSuite();

        suite.setName(AtlassianJsTest.class.getName());

        openTestPage("test.html");
        client.waitForPageToLoad(10000);
        assertThat.textPresent("Test Page");

        String concatenatedTestNames = client.getEval("window.testAjs.getTestNames()");
        String[] methodNames = concatenatedTestNames.split(",");

        System.out.println(concatenatedTestNames);

        for (String methodName : methodNames) {
            suite.addTest(new JavaScriptTest(methodName));
        }

        return suite;
    }

    private class JavaScriptTest extends TestCase {
        private JavaScriptTest(String methodName) {
            setName(methodName);
        }

        protected void runTest() throws Throwable {

            assertEquals("true", client.getEval("window.testAjs." + getName() + "()"));
        }
    }
}
