package com.atlassian.aui.gwt.component.input.client;

import com.atlassian.aui.gwt.component.input.client.ItemRemovedHandler;
import com.google.gwt.event.shared.GwtEvent;

/**
 * Fired when an item is added to the list
 */
public class ItemRemovedEvent extends GwtEvent<ItemRemovedHandler>
{
    /**
     * The event type.
     */
    private static Type<ItemRemovedHandler> TYPE = new Type<ItemRemovedHandler>();

    private final String item;

    public ItemRemovedEvent(String item)
    {
        this.item = item;
    }

    /**
     * Handler hook.
     *
     * @return the handler hook
     */
    static Type<ItemRemovedHandler> getType()
    {
        if (TYPE == null)
        {
            TYPE = new Type<ItemRemovedHandler>();
        }
        return TYPE;
    }

    @Override
    public final Type<ItemRemovedHandler> getAssociatedType()
    {
        return TYPE;
    }

    @Override
    protected void dispatch(ItemRemovedHandler addedHandler)
    {
        addedHandler.onItemRemoved(this);
    }

    public String getItem()
    {
        return item;
    }
}