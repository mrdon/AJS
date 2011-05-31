AUI Readme:

AUI is the Atlassian User Interface library. It is provided as a plugin for use in Atlassian products.

Component documentation and release notes can be found at http://confluence.atlassian.com/display/AUI

The AUI build uses the Atlassian reference application (REFAPP) for development and testing. The simplest way to ensure you have the dependencies covered is to install the Atlassian Plugin SDK (http://confluence.atlassian.com/display/DEVNET/Developing+your+Plugin+using+the+Atlassian+Plugin+SDK).

To run the full build, execute:

   mvn clean install

...from the root of your AUI checkout.

To run the reference application, execute:

   mvn refapp:run

...from the /auiplugin-tests/ subdirectory.

Key refapp URLS:

http://localhost:9999/ajs/                                                       - Landing page for the AUI refapp
http://localhost:9999/ajs/plugins/servlet/ajstest/test-pages/index.html          - Clickable samples for manual testing
http://localhost:9999/ajs/plugins/servlet/ajstest/unit-tests/tests/allTests.html - QUnit tests

Contents:

auiplugin/                                              - The AUI plugin itself
auiplugin/src/demo                                      - Samples show the usage of AUI components
auiplugin/src/main/resources/                           - The contents of the AUI plugin including JS and CSS
auiplugin-tests/                                        - A plugin for tests of all kinds
auiplugin-tests/src/test/java/                          - The Selenium tests
auiplugin-tests/src/main/resources/test-pages           - The samples as used in manual and automated testing
auiplugin-tests/src/main/resources/unit-tests/tests/js  - The qunit tests

Samples:
Each component should have a basic sample available in the auiplugin/test-pages folder.  There are two copies of the
samples folder to allow each to evolve to their needs.  The one in auiplugin/src/demo is for developer examples
and the one in auiplugin-tests/src/main/resources/test-pages is for manual and automated testing.


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
   
If you want to add a new component into AUI the following command will help you generate the files required
 
mvn auicomponent:generate
