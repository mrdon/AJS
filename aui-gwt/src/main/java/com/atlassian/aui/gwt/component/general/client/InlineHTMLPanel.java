package com.atlassian.aui.gwt.component.general.client;

import com.google.gwt.user.client.ui.HTMLPanel;

public class InlineHTMLPanel extends HTMLPanel
{
    public InlineHTMLPanel(String html)
    {
        super("span", html);
    }
}
