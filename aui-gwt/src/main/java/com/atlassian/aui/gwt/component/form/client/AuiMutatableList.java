package com.atlassian.aui.gwt.component.form.client;

import com.atlassian.aui.gwt.component.input.client.ItemAddedEvent;
import com.atlassian.aui.gwt.component.input.client.ItemAddedHandler;
import com.atlassian.aui.gwt.component.input.client.ItemRemovedEvent;
import com.atlassian.aui.gwt.component.input.client.ItemRemovedHandler;
import com.atlassian.aui.gwt.component.input.client.MutatableList;
import com.google.gwt.core.client.GWT;
import com.google.gwt.uibinder.client.UiBinder;
import com.google.gwt.uibinder.client.UiFactory;
import com.google.gwt.uibinder.client.UiField;
import com.google.gwt.user.client.ui.HTMLPanel;
import com.google.gwt.user.client.ui.HasValue;
import com.google.gwt.user.client.ui.Widget;

import java.util.List;


/**
 * TODO: Document this class / interface here
 *
 * @since v4.0
 */
public class AuiMutatableList extends AuiField<List>
{
    private static UiBuilder uiBinder = GWT.create(UiBuilder.class);
    private List<String> suggestData;

    interface UiBuilder extends UiBinder<HTMLPanel, AuiMutatableList>
    {
    }


    @UiField
    MutatableList input;

    public AuiMutatableList(List<String> suggestData)
    {
        super(false);
        this.suggestData = suggestData;
        initWidget(createAndBindUi());
        init();

        input.addItemAddedHandler(new ItemAddedHandler()
        {

            public void onItemAdded(ItemAddedEvent itemAddedEvent)
            {
                input.addItem(itemAddedEvent.getItem());
            }
        });

        input.addItemRemovedHandler(new ItemRemovedHandler()
        {

            public void onItemRemoved(ItemRemovedEvent itemRemovedEvent)
            {
                input.removeItem(itemRemovedEvent.getItem());
            }
        });
    }

    @Override
    protected Class<List> getInputWidgetDataClass()
    {
        return List.class;
    }

    @Override
    protected Widget createAndBindUi()
    {
        return uiBinder.createAndBindUi(this);
    }

    @Override
    public HasValue<List> getInputWidget()
    {
        return input;
    }

    @UiFactory
    MutatableList createMutatableList()
    {
        return new MutatableList(suggestData);
    }

    public void setAddLabel(String val)
    {
        input.setAddLabel(val);

    }

    public void addItemAddedHandler(ItemAddedHandler handler)
    {
        input.addItemAddedHandler(handler);
    }

    public void addItemRemovedHandler(ItemRemovedHandler handler)
    {
        input.addItemRemovedHandler(handler);
    }

    public void addItem(String item)
    {
        input.addItem(item);
    }

    public void removeItem(String item)
    {
        input.removeItem(item);
    }



}