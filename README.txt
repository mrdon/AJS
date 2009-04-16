AUI Readme:

Samples:
Each component should have a basic sample available in the samples folder. Note that due to how the plugin structure works, the CSS images *will not* display on these sample pages. (Yes, this sucks, if you've got a fix, we'd love to hear it.)


Tests:

Run the tests with the following maven command (This requires Firefox 2 to be installed under the specified location):

   mvn integration-test -Dselenium.browser="*firefox /Applications/Firefox2.app/Contents/MacOS/firefox-bin"


To debug, use the run profile and navigate to the following page to use Firebug's debug mode:

   mvn -Prun -Dselenium.browser="*firefox /Applications/Firefox2.app/Contents/MacOS/firefox-bin"
   http://localhost:9999/ajs/test.html

