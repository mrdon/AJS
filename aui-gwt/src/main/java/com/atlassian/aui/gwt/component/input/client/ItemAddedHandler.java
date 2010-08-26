package com.atlassian.aui.gwt.component.input.client;

import com.atlassian.aui.gwt.component.input.client.ItemAddedEvent;
import com.google.gwt.event.shared.EventHandler;

public interface ItemAddedHandler extends EventHandler
{
    void onItemAdded(ItemAddedEvent itemAddedEvent);
}
