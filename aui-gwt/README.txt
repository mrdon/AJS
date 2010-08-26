AUI Readme:

Samples:
Each component should have a basic sample available in the samples folder.

Tests:
Run the tests with the following maven command (This requires Firefox 2 to be installed under the specified location):

   mvn integration-test -Dselenium.browser="*firefox /Applications/Firefox2.app/Contents/MacOS/firefox-bin"


To debug, use the run profile and navigate to the following page to use Firebug's debug mode:

   mvn -Prun -Dselenium.browser="*firefox /Applications/Firefox2.app/Contents/MacOS/firefox-bin"
   http://localhost:9999/ajs/test.html



If you're running Windows:

   Path format:
   mvn install -Dselenium.browser="*firefox C:\Program Files (x86)\Mozilla Firefox 2\firefox.exe"
   mvn integration-test -Dselenium.browser="*firefox C:\Program Files (x86)\Mozilla Firefox 2\firefox.exe"

   Why FF2? FF3.5 didn't work, FF2 did.

