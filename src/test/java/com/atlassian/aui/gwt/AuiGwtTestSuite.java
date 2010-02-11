package com.atlassian.aui.gwt;

import com.atlassian.aui.gwt.component.form.client.TestAuiForm;
import com.google.gwt.junit.tools.GWTTestSuite;
import junit.framework.Test;
import junit.framework.TestCase;

public class AuiGwtTestSuite extends TestCase /*note this is TestCase and not TestSuite */
  {
      public static Test suite()
      {
          GWTTestSuite suite = new GWTTestSuite( "All Gwt Tests go in here" );
          suite.addTestSuite(TestAuiForm.class);
          return suite;
      }
  }
