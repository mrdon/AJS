package com.atlassian.aui.gwt.component.input.client;

import com.atlassian.aui.gwt.component.input.client.ItemRemovedEvent;
import com.google.gwt.event.shared.EventHandler;

public interface ItemRemovedHandler extends EventHandler
{
    void onItemRemoved(ItemRemovedEvent itemRemovedEvent);
}