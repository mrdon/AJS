package com.atlassian.aui

import org.codehaus.groovy.maven.mojo.GroovyMojo
import org.apache.maven.wagon.Wagon
import org.apache.maven.wagon.AbstractWagon
import org.apache.maven.wagon.providers.webdav.WebDavWagon
import org.apache.maven.wagon.authentication.AuthenticationInfo
import org.apache.maven.wagon.repository.Repository
import org.apache.maven.settings.Settings
import org.apache.maven.project.MavenProjectBuilder
import org.apache.maven.project.MavenProject
import org.apache.maven.execution.MavenSession
import org.apache.maven.plugin.PluginManager

/**
 * Maven2 mojo for generating a new aui-component.xml
 *
 * @goal generateDocs
 * @aggregator true
 */
class GenerateDocs
extends GroovyMojo
{

  /**
   * The Maven Session Object
   *
   * @parameter expression="${session}"
   * @required
   * @readonly
   */
  protected MavenSession session;

  def PROPERTY_SEPERATOR = ">"
  def INFORMATION_BEGIN = "/*->"
  def INFROMATION_END = "<-*/"
  def MAINXMLPATH = "aui-components.xml"
  def TESTXMLPATH = "auiplugin-tests/src/main/resources/sandbox/aui-components.xml"
  /**
  * The base directory of the project
  * @parameter expression="${basedirectory}" default-value="/"
  */

   private String basedirectory

  /**
  * The current version of the project
  * @parameter expression="${currentversion}" default-value="TRUNK"
  */

  private String currentversion

  File templatesFolder
  File project

  void execute()
  {
    //----- GENERATE AUI-COMPONENTS.XML FILE -----
    def fileList = []
    def tempInformation = []
    def componentList = []
    File jsDirectory = new File("${basedirectory}/auiplugin/src/main/resources/js/atlassian/");
    jsDirectory.eachFile {
      fileList = it.name.tokenize(".")
      if(fileList.get(fileList.size()-1).equals("js")){
        tempInformation = getInformation(it)
        if(tempInformation){
          componentList.push(tempInformation)  
        }
      }
    }
    //Generate file in two locations, one for sandbox use and one for general use (in the parent folder)
    generateXMLFile(componentList, "${basedirectory}" + MAINXMLPATH)
    generateXMLFile(componentList, "${basedirectory}" + TESTXMLPATH)
    println ""
    println "SUCCESS!!"
    println ""
    println "aui-component.xml created at: ${basedirectory}"+ MAINXMLPATH
    println ""
    println "aui-component.xml created at: ${basedirectory}"+ TESTXMLPATH
    println ""
    println "------------------------------------------------------------------------------------"




    //----- PREPARE FILES FOR UPLOADS -----

    //Prepare Sandbox for Upload
    println "Preparing Sandbox files for upload..."
    File sandboxJs = new File("${basedirectory}/auiplugin-tests/target/classes/sandbox/includeAJS.js")
    File sandboxCss = new File("${basedirectory}/auiplugin-tests/target/classes/sandbox/includeAJS.css");

    if(sandboxJs && sandboxCss){
      println "Editing file path strings within demo files to work with docs.atlassian.com file structure..."
      println ""
      String newJS = sandboxJs.getText().replaceAll("../../../../../auiplugin/src/main/resources/js/", "../AUI/js/");
      String newCSS = sandboxCss.getText().replaceAll("../../../../../auiplugin/src/main/resources/css/", "../AUI/css/");

      sandboxJs.write(newJS)
      sandboxCss.write(newCSS)

    } else {
      println "Sandbox has not yet been built! Run this goal after build"
    }

    //Prepare Demo Pages for Upload

    println "Preparing Demo Page files for upload..."
    println "Copying demo pages to staging folder..."
    //copy required files to a staging folder
    File demoPages = new File("${basedirectory}/auiplugin/src/demo/");
    File stagingDemoPages = new File ("${basedirectory}/auiplugin/target/classes/demo-pages/");
    AntBuilder ant = new AntBuilder()
    ant.delete(dir:stagingDemoPages.getAbsolutePath())
    stagingDemoPages.mkdir()
    ant.copy ( todir : stagingDemoPages.getAbsolutePath() ){
      fileset(dir:demoPages.getAbsolutePath())
    };

    ant.copy(file:"${basedirectory}/auiplugin-tests/src/main/resources/css/test-and-demo-pages.css", tofile: stagingDemoPages.getAbsolutePath()+"/test-and-demo-pages.css")

    println "Editing file path strings within demo files to work with docs.atlassian.com file structure.."
    //Replace file paths to work with file structure on docs.atlassian.com
    File demoJs = new File("${basedirectory}/auiplugin/target/classes/demo-pages/aui.js")
    File demoCommonCss = new File("${basedirectory}/auiplugin/target/classes/demo-pages/common.css");

    String newDemoJS = demoJs.getText().replaceAll("../../../../auiplugin/src/main/resources/js/", "../../AUI/js/");
    String newDemoCommonCSS = demoCommonCss.getText().replaceAll("../../../auiplugin/src/main/resources/css/", "../AUI/css/");
    newDemoCommonCSS = newDemoCommonCSS.replaceAll("../../../auiplugin-tests/src/main/resources/css/", "");
    println ""





    //----- UPLOAD DOCUMENTATION ------
    
    Repository docsAtlassian = new Repository("docs-atlassian", "https://docs.atlassian.com/aui")
    WebDavWagon wagon = new WebDavWagon();
    AuthenticationInfo auth = new AuthenticationInfo();

    //Authentication
    auth.password = session.settings.getServer("docs-atlassian").getPassword()
    auth.setUserName session.settings.getServer("docs-atlassian").getUsername()

    println "Connecting to https://docs.atlassian.com..."
    //connect to docs.atlassian
    wagon.connect(docsAtlassian, auth);
    wagon.openConnection();
    println "Connected!"

    //upload AUI Source files
    File auiJsDirectory = new File("${basedirectory}/auiplugin/target/classes/js/")
    File auiCssDirectory = new File("${basedirectory}/auiplugin/target/classes/css/")

    println ""
    println "Uploading AUI JS Files..."
    uploadDirectory auiJsDirectory, "${currentversion}/AUI/js/", wagon
    uploadDirectory auiJsDirectory, "latest/AUI/js/", wagon

    println ""
    println "Uploading AUI CSS Files..."
    uploadDirectory auiCssDirectory, "${currentversion}/AUI/css/", wagon
    uploadDirectory auiCssDirectory, "latest/AUI/css/", wagon



    //upload sandbox files
    File sandboxDirectory = new File("${basedirectory}/auiplugin-tests/target/classes/sandbox/")

    println "Uploading Sandbox Files..."
    uploadDirectory sandboxDirectory, "${currentversion}/sandbox/", wagon
    uploadDirectory sandboxDirectory, "latest/sandbox/", wagon

    println ""
    println "AUI Sandbox for v${currentversion} was uploaded successfully!"
    println ""
    //upload demo page files

    println "Uploading Demo Page Files..."
    demoJs.write(newDemoJS)
    demoCommonCss.write(newDemoCommonCSS)

    uploadDirectory stagingDemoPages, "${currentversion}/demo-pages/", wagon
    uploadDirectory stagingDemoPages, "latest/demo-pages/", wagon

    println ""
    println "AUI Demo Pages for v${currentversion} was uploaded successfully!"
    println ""

    //close the wagon connection
    wagon.closeConnection()
  }

  private void uploadDirectory(File directory, String destination, WebDavWagon wagon){
    directory.eachFile {
      if(it.isDirectory()){
        uploadDirectory(it, destination + it.getName() + "/", wagon)
      } else {
        println "Uploading " + it.getName() +" >>>>>> " + wagon.getRepository().getUrl() +"/" + destination + it.getName()
        wagon.put(it, destination + "/"+ it.getName())
      }

    }
  }

  private Map getInformation(File file){
    def informationMap = [:]
    def startCapture = false
    file.eachLine {
      if(it.equals(INFORMATION_BEGIN)){
        startCapture = true
      } else if (it.equals(INFROMATION_END)){
        startCapture = false
      }
      if(startCapture && !it.equals(INFORMATION_BEGIN) ){
        def tempProperty = parseLine(it)
        if(!informationMap[tempProperty.get(0).toString()]){
          informationMap[tempProperty.get(0).toString()] = []
        }
        informationMap[tempProperty.get(0).toString()] << tempProperty.get(1).toString()
      }
    }
    return informationMap
  }

  private List parseLine(String line) {
    def tempList = line.tokenize(PROPERTY_SEPERATOR)
    tempList.set(0, tempList.get(0).toString().replaceAll("#", ""))
    return tempList
  }

  private void generateXMLFile(List components, String path){
    def XMLFile = new File(path)
    XMLFile.write("")
    components.each{
      XMLFile.append("<component>\n")
      it.each {
        it.each {
          def key = it.getKey()
          it.getValue().each {
            XMLFile.append("    <" + key + "> " + it + " </" + key + ">\n")
          }

        }

      }
      XMLFile.append("</component>\n\n")
    }
  }

}

