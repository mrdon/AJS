AUI Readme:

The AUI build uses the Atlassian Plugin SDK to simply its build and allow tests to be ran in actual products.

To run the full build, execute:

   mvn clean install


Contents:

auiplugin/                                 - The AUI plugin itself
auiplugin/samples                          - Samples show the usage of AUI components
auiplugin/src/main/resources/              - The contents of the AUI plugin including JS and CSS
auiplugin-tests/                           - A plugin for tests of all kinds
auiplugin-tests/src/test/java/             - The Selenium tests
auiplugin-tests/src/main/resources/js/test - The in-browser tests

Samples:
Each component should have a basic sample available in the samples folder.

Tests:
Run the tests with the following commands. (The browser is automatically installed for your OS):

   mvn install

To choose another browser installed on your machine, use:

   mvn install -Dselenium.browser="*firefox /Applications/Firefox2.app/Contents/MacOS/firefox-bin"


To debug, start the webapp in debug mode, then execute Selenium tests from your IDE:

   cd auiplugin-tests
   mvn refapp:debug


Skipping tests

    Just add the '-Dmaven.test.skip' flag, eg:
        mvn clean install -Dmaven.test.skip


Run/debug AUI in a different product, say, Confluence:

   mvn refapp:debug -Dproduct=confluence
