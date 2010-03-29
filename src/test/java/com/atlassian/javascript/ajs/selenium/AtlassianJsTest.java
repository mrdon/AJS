package com.atlassian.javascript.ajs.selenium;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;
import org.apache.log4j.Logger;

import java.util.Enumeration;

public class AtlassianJsTest extends AUISeleniumTestCase {

    private static final Logger logger = Logger.getLogger(AtlassianJsTest.class);

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
            logger.info(">>>>>>>>>>>>>>>>>> Running: " + getName());
            assertEquals("true", client.getEval("window.testAjs." + getName() + "()"));
        }
    }
}
