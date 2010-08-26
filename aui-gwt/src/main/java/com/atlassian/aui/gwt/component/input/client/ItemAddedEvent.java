package com.atlassian.aui.gwt.component.input.client;

import com.atlassian.aui.gwt.component.input.client.ItemAddedHandler;
import com.google.gwt.event.shared.GwtEvent;

/**
 * Fired when an item is added to the list
 */
public class ItemAddedEvent extends GwtEvent<ItemAddedHandler>
{
    /**
     * The event type.
     */
    private static Type<ItemAddedHandler> TYPE = new Type<ItemAddedHandler>();

    private final String item;

    public ItemAddedEvent(String item)
    {
        this.item = item;
    }

    /**
     * Handler hook.
     *
     * @return the handler hook
     */
    static Type<ItemAddedHandler> getType()
    {
        if (TYPE == null)
        {
            TYPE = new Type<ItemAddedHandler>();
        }
        return TYPE;
    }

    @Override
    public final Type<ItemAddedHandler> getAssociatedType()
    {
        return TYPE;
    }

    @Override
    protected void dispatch(ItemAddedHandler addedHandler)
    {
        addedHandler.onItemAdded(this);
    }

    public String getItem()
    {
        return item;
    }
}