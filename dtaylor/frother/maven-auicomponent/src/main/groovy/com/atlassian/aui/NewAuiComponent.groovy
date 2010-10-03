package com.atlassian.aui

import org.codehaus.groovy.maven.mojo.GroovyMojo

/**
 * Maven2 mojo for generating a new AUI component
 *
 * @goal generate
 * @aggregator true
 */
class NewAuiComponent
extends GroovyMojo
{
  /**
   * The name of the new component
   * @parameter expression="${componentName}" default-value="NewComponent"
   */
  private String componentName

  /**
   * The base directory of the project
   * @parameter expression="${basedirectory}" default-value="/"
   */
  private String basedirectory

  boolean needCSS
  boolean needJS
  File templatesFolder
  File project

  void execute()
  {
    InputStreamReader input = new InputStreamReader(System.in);
    BufferedReader reader = new BufferedReader(input);
    project = new File("${basedirectory}");
    templatesFolder = new File("${basedirectory}templates");

    println("");
    println("");
    println "AAAAAAAAAAAAAAAAAAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA........"
    println ".AAAAAAAAAAAAAAAAAAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA......."
    println "..AAAAAAAAAAAAAAAAAAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA......"
    println "...AAAAAAAAAAAAAAAAAAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA....."
    println "...AAAAAAAAAAAAAAAAAAAAAAAA........AAAAAAAAA.......AAAAAAAA........AAAAAAAA....."
    println "....AAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA...."
    println ".....AAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA..."
    println "......AAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA.."
    println "......AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.......AAAAAAAAAAAAAAAAAAAAAAAAA."
    println ".....AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA........AAAAAAAAAAAAAAAAAAAAAAAA."
    println ".....AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA........AAAAAAAAAAAAAAAAAAAAAAAA"
    println "....AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA........AAAAAAAAAAAAAAAAAAAAAAAA."
    println "...AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.......AAAAAAAAAAAAAAAAAAAAAAAAA."
    println "......AAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA.."
    println ".....AAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA..."
    println "....AAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA........AAAAAAAA...."
    println "...AAAAAAAA........AAAAAAAA........AAAAAAAAAAAAAAAAAAAAAAAAA.......AAAAAAAAA...."
    println "...AAAAAAAA........AAAAAAAA........AAAAAAAAAAAAAAAAAAAAAAAA........AAAAAAAA....."
    println "..AAAAAAAA........AAAAAAAA........AAAAAAAAAAAAAAAAAAAAAAAA........AAAAAAAA......"
    println ".AAAAAAAA........AAAAAAAA........AAAAAAAAAAAAAAAAAAAAAAAA........AAAAAAAA......."
    println "AAAAAAAA........AAAAAAAA........AAAAAAAAAAAAAAAAAAAAAAAA........AAAAAAAA........"
    println("--------------------------------------------------------------------------------");
    println("----------------------------------New AUI Component-----------------------------");
    println("--------------------------------------------------------------------------------");
    println("");

    boolean confirm = false
    boolean[] componentRequirements = [false, false, false]
    int choice
    while (!confirm)
    {
      //read in the user's desired component Name
      if (!componentRequirements[0])
      {
        println("Please enter the name of your new component:");
        componentName = reader.readLine();
        componentRequirements[0] = true;
      }

      if (!componentRequirements[1])
      {
        println "Does your new component have javascript? (y/n): y"
        needJS = convertStringToBoolean(reader.readLine());
        componentRequirements[1] = true;
      }
      if (!componentRequirements[2])
      {
        println "Does your new component have CSS? (y/n): y"
        needCSS = convertStringToBoolean(reader.readLine());
        componentRequirements[2] = true;
      }
      println "-------------------------------------------------------------------------------"

      println ""
      println "You are creating a new component named: ${componentName}"
      println "Your component needs Javascript: " + needJS;
      println "Your component needs CSS: " + needCSS;
      println ""
      println "Is this correct? (y/n): y"
      confirm = convertStringToBoolean(reader.readLine());

      if (!confirm)
      {
        println "Which needs changing?:"
        println "1. Name, 2. need Javascript, 3. need CSS"
        choice = Integer.parseInt(reader.readLine());

        if (choice <= 3 && choice > 0)
        {
          componentRequirements[choice - 1] = false;
        }
        else
        {
          println "You did not enter the a valid choice."
        }
      }
    }

    if (confirm)
    {
      println "----------------------------BEGIN COMPONENT GENERATION------------------------"
      println "Adding new Files:"

      //Add Javascript files if required
      if (needJS)
      {
        println ""
        println ">>> Adding javascript files..."
        makeFileFromTemplate("${componentName}.js", "${basedirectory}auiplugin/src/main/resources/js/atlassian/", "main-template.js", "")
        generateJS(new File("${basedirectory}auiplugin/src/main/resources/js/atlassian/${componentName}.js"))
      }

      //Add CSS files if required
      if (needCSS)
      {
        println ""
        println ">>> Adding CSS files..."
        makeFileFromTemplate("${componentName}.css", "${basedirectory}auiplugin/src/main/resources/css/atlassian/", "main-template.css", "")
        makeFileFromTemplate("${componentName}-ie.css", "${basedirectory}auiplugin/src/main/resources/css/atlassian/", "main-template-ie.css", "")

      }

      println ""
      println ">>> Adding Demo Pages..."
      makeFileFromTemplate("${componentName}-demo.html", "${basedirectory}auiplugin/src/demo/${componentName}/", "demo-template.html", "")

      println ""
      println ">>> Adding Test Pages..."
      makeFileFromTemplate("${componentName}-test.html", "${basedirectory}auiplugin-tests/src/main/resources/test-pages/${componentName}/", "testpage-template.html", "")

      println ""
      println ">>> Adding Unit Tests..."
      makeFileFromTemplate("${componentName}-unit-tests.js", "${basedirectory}auiplugin-tests/src/main/resources/unit-tests/tests/${componentName}-unit-tests/", "qunit-tests-template.js", "module(\"${componentName} Unit Tests\");\n")
      makeFileFromTemplate("${componentName}-unit-tests.html", "${basedirectory}auiplugin-tests/src/main/resources/unit-tests/tests/${componentName}-unit-tests/", "qunit-testpage-template.html", "")
      println ">>>>>> Adding Qunit Resource to atlassian-plugin.xml"
      println ">>>>>>>>> Creating temporary atlassian-plugin-temp.xml"
      File atlassianPlugin = new File("${basedirectory}auiplugin-tests/src/main/resources/atlassian-plugin.xml")
      File newAtlassianPlugin = createNewFileUnderDirectory("${basedirectory}auiplugin-tests/src/main/resources/", "atlassian-plugin-temp.xml")

      println ">>>>>>>>> Constructing new atlassian-plugin.xml within atlassian-plugin-temp.xml"
      atlassianPlugin.eachLine {line ->
        newAtlassianPlugin.append(line + "\n")
        if (line == "    <!-- ComponentTests -->")
        {
          newAtlassianPlugin.append("    <web-resource key='${componentName}-unit-tests'>\n")
          newAtlassianPlugin.append("        <resource type='download' name='${componentName}-unit-tests.js' location='unit-tests/tests/${componentName}-unit-tests/${componentName}-unit-tests.js'/>\n")
          newAtlassianPlugin.append("    </web-resource>\n\n")
        }

        if (line == "        <!--AllTests-->")
        {
          newAtlassianPlugin.append("        <dependency>auiplugin-tests:${componentName}-unit-tests</dependency>\n");
        }
      }
      println ">>>>>>>>> Copying atlassian-plugin-temp.xml to atlassian-plugin.xml"
      atlassianPlugin.write(newAtlassianPlugin.getText());
      println ">>>>>>>>> Removing atlassian-plugin-temp.xml"
      newAtlassianPlugin.delete();

      println ""
      println "----------------------------------COMPLETE---------------------------------"
      println ""
      println "Template files necessary to include your component '${componentName}' in AUI were successfully created!  Please make sure you modify them appropriately:"
      println ""

      if (needJS)
      {
        println "Component Javascript File: ${basedirectory}auiplugin/src/main/resources/js/atlassian/${componentName}.js"
        println ""
      }
      if (needCSS)
      {
        println "Component CSS File: ${basedirectory}auiplugin/src/main/resources/css/atlassian/${componentName}.css"
        println ""
        println "Component IE CSS File: ${basedirectory}auiplugin/src/main/resources/css/atlassian/${componentName}-ie.css"
        println ""
      }

      println "Demo Page: ${basedirectory}auiplugin/src/demo/${componentName}/${componentName}-demo.html"
      println ""
      println "Test Page: ${basedirectory}auiplugin-tests/src/main/resources/test-pages/${componentName}/${componentName}-test.html"
      println ""
      println "Unit Tests: ${basedirectory}auiplugin-tests/src/main/resources/unit-tests/tests/${componentName}-unit-tests/${componentName}-unit-tests.js"
      println ""
      println "Unit Tests Page: ${basedirectory}auiplugin-tests/src/main/resources/unit-tests/tests/${componentName}-unit-tests/${componentName}-unit-tests.html"
      println ""

    }

  }

  private boolean convertStringToBoolean(String booleanString)
  {
    return (booleanString.toLowerCase() != "n");
  }

  private File createNewFileUnderDirectory(String parentDirectory, String filename)
  {
    boolean test2 = new File(parentDirectory).mkdirs();
    boolean test = new File(parentDirectory + filename).createNewFile();
    return new File(parentDirectory + "/" + filename);

  }

  private void makeFileFromTemplate(String filename, String parentDirectory, String template, String prepend)
  {
    File newFile = createNewFileUnderDirectory(parentDirectory, filename);
    templatesFolder.eachFileMatch(template) { file ->
      println ">>>>>> creating: " + newFile.absolutePath
      newFile.append(prepend);
      newFile.append(file.getText());
      println ">>>>>>>>> DONE!"
    }
  }

  private void generateJS(File jsFile){
    jsFile.append("//This is the javascript file for the AUI component ${componentName}\n")
    jsFile.append("(function () {\n")
    jsFile.append("    AJS.${componentName} = AJS.${componentName} || {};\n")
    jsFile.append("    AJS.${componentName}.renameThisFunction = function (options) {\n")
    jsFile.append("        // options must be an object\n")
    jsFile.append("        // your code here\n")
    jsFile.append("    };\n")
    jsFile.append("})();")
  }
}

