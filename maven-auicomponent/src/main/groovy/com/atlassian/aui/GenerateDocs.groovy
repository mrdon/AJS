package com.atlassian.aui

import org.codehaus.groovy.maven.mojo.GroovyMojo

/**
 * Maven2 mojo for generating a new AUI component
 *
 * @goal generateDocs
 * @aggregator true
 */
class GenerateDocs
extends GroovyMojo
{
  def PROPERTY_SEPERATOR = ">"
  def INFORMATION_BEGIN = "/*->"
  def INFROMATION_END = "<-*/"
  def MAINXMLPATH = "aui-components.xml"
  def TESTXMLPATH = "auiplugin-tests/src/main/resources/live-demo/aui-components.xml"
  /**
   * The base directory of the project
   * @parameter expression="${basedirectory}" default-value="/"
   */
  private String basedirectory

  File templatesFolder
  File project

  void execute()
  {
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
    println tempList
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

