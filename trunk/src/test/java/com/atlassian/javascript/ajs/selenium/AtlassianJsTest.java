package com.atlassian.javascript.ajs.selenium;

import junit.framework.TestCase;
import junit.framework.Test;
import junit.framework.TestSuite;
import junit.framework.TestResult;
import com.atlassian.javascript.ajs.selenium.client.Client;
import com.atlassian.javascript.ajs.selenium.client.Configuration;
import com.atlassian.selenium.SeleniumAssertions;

import java.io.IOException;

public class AtlassianJsTest extends TestCase
{
    private static Client client = Client.getInstance();
    private static SeleniumAssertions assertThat = new SeleniumAssertions(client, Configuration.getInstance());

    public static Test suite() throws IOException
    {
        TestSuite suite = new TestSuite();
        suite.setName(AtlassianJsTest.class.getName());

        client.open("ajs/test.html"); //todo fix context path
        client.waitForPageToLoad(10000); // todo this should be configured
        assertThat.textPresent("Test Page");

        String concatenatedTestNames = client.getEval("window.testAjs.getTestNames()");        
        String[] methodNames = concatenatedTestNames.split(",");
        for (String methodName : methodNames)
        {
            suite.addTest(new AtlassianJsTest(methodName)); // run one test method
        }

        return suite;
    }

    private String methodName;

    public AtlassianJsTest(String methodName)
    {
        super();
        this.methodName = methodName;
    }

    public String getName()
    {
        return methodName;
    }

    protected void runTest() throws Throwable
    {
        // todo extract out context path
        assertEquals("true", client.getEval("window.testAjs." + methodName + "()"));
    }
}
