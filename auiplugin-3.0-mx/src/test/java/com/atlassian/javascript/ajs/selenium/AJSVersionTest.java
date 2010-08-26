package com.atlassian.javascript.ajs.selenium;

import junit.framework.TestCase;

import java.io.File;

import org.apache.commons.io.FileUtils;

public class AJSVersionTest extends TestCase {

    public void testVersionIsFilteredByTheIntermavens() throws Exception {
        final File file = new File("target/classes/js/atlassian/atlassian.js");

        assertTrue("atlassian.js should exist at " + file.getAbsolutePath(), file.exists());

        assertFalse("Should not contain maven expression", FileUtils.readFileToString(file).contains("${project.version}"));
    }
}
