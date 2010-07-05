package it.com.atlassian.aui.javascript.integrationTests;

public class AUIIconsTest extends AbstractAUISeleniumTestCase
{
    private static final String TEST_PAGE = "test-pages/icons/icons-test.html";

    public void testErrorIcon(){
        openTestPage(TEST_PAGE);
        assertThat.elementPresent("css=div#error-icon span.error svg");
    }

    public void testGenericIcon(){
        openTestPage(TEST_PAGE);
        assertThat.elementPresent("css=div#generic-icon span.generic svg");
    }

    public void testHintIcon(){
        openTestPage(TEST_PAGE);
        assertThat.elementPresent("css=div#hint-icon span.hint svg");
    }

    public void testInfoIcon(){
        openTestPage(TEST_PAGE);
        assertThat.elementPresent("css=div#info-icon span.info svg");
    }

    public void testSucessIcon(){
        openTestPage(TEST_PAGE);
        assertThat.elementPresent("css=div#success-icon span.success svg");
    }

    public void testWarningIcon(){
        openTestPage(TEST_PAGE);
        assertThat.elementPresent("css=div#warning-icon span.warning svg");
    }

        public void testCloseIcon(){
        openTestPage(TEST_PAGE);
        assertThat.elementPresent("css=div#close-icon span.close svg");
    }
}
