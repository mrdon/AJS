AUI Readme:

The AUI build uses the Atlassian Plugin SDK to simply its build and allow tests to be ran in actual products.

To run the full build, execute:

   mvn clean install


Contents:

auiplugin/                                            - The AUI plugin itself
auiplugin/samples                                     - Samples show the usage of AUI components
auiplugin/src/main/resources/                         - The contents of the AUI plugin including JS and CSS
auiplugin-tests/                                      - A plugin for tests of all kinds
auiplugin-tests/src/test/java/                        - The Selenium tests
auiplugin-tests/src/main/resources/samples            - The samples as used in manual and automated testing
auiplugin-tests/src/main/resources/js/tests           - The in-browser tests
auiplugin-tests/src/main/resources/js/tests/unit      - The qunit tests

Key URLS:

http://localhost:9999/ajs/plugins/servlet/ajstest/samples/       - Clickable samples for manual testing
http://localhost:9999/ajs/plugins/servlet/ajstest/js/tests/unit/ - QUnit tests


Samples:
Each component should have a basic sample available in the auiplugin/samples folder.  There are two copies of the
samples folder to allow each to evolve to their needs.  The one in auiplugin/samples is for developer examples
and the one in auiplugin-tests/src/main/resources/samples is for manual and automated testing.


Tests:
Run the tests with the following commands. (The browser is automatically installed for your OS):

   mvn install

To choose another browser installed on your machine, use:

   mvn install -Dselenium.browser="*firefox /Applications/Firefox2.app/Contents/MacOS/firefox-bin"


To debug, start the webapp.  You can then click the samples, run the qunit tests, or execute Selenium tests 
from your IDE:

   cd auiplugin-tests
   mvn refapp:run


Skipping tests

    Just add the '-Dmaven.test.skip' flag, eg:
        mvn clean install -Dmaven.test.skip


Run/debug AUI in a different product, say, Confluence:
 
   cd auiplugin-tests
   mvn refapp:run -Dproduct=confluence


Run/debug AUI in a different product, say, Confluence, and a specific version:

   cd auiplugin-tests
   mvn refapp:run -Dproduct=confluence -Dproduct.version=3.5-m1
