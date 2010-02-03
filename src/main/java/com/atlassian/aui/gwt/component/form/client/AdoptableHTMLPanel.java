package com.atlassian.aui.gwt.component.form.client;

import com.google.gwt.user.client.ui.HTMLPanel;
import com.google.gwt.user.client.ui.Widget;

public class AdoptableHTMLPanel extends HTMLPanel
{
    public AdoptableHTMLPanel(String html)
    {
        super(html);
    }

    public AdoptableHTMLPanel(String tag, String html)
    {
        super(tag, html);
    }

    public void adoptInsertedWidget(Widget widget)
    {
        widget.removeFromParent();
        getChildren().add(widget);
        adopt(widget);
    }

}
