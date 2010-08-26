package com.atlassian.aui.gwt.util.client;

import com.google.gwt.core.client.GWT;
import com.google.gwt.resources.client.ClientBundle;
import com.google.gwt.resources.client.CssResource;
import com.google.gwt.resources.client.TextResource;

public interface AuiResources  extends ClientBundle
{
  public static final AuiResources INSTANCE =  GWT.create(AuiResources.class);

  @Source("css/gwt/basic.css")
  public TextResource css();

}
