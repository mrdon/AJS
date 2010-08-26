package com.atlassian.aui.gwt.component.form.client;

import com.atlassian.aui.gwt.component.form.client.forks.CheckBox;
import com.google.gwt.core.client.GWT;
import com.google.gwt.uibinder.client.UiBinder;
import com.google.gwt.uibinder.client.UiField;
import com.google.gwt.user.client.ui.HTMLPanel;
import com.google.gwt.user.client.ui.HasValue;
import com.google.gwt.user.client.ui.Widget;


/**
 * TODO: Document this class / interface here
 *
 * @since v4.0
 */
public class AuiCheckBox extends AuiField<Boolean>
{
    private static UiBuilder uiBinder = GWT.create(UiBuilder.class);

    interface UiBuilder extends UiBinder<HTMLPanel, AuiCheckBox>
    {
    }


    @UiField
    CheckBox input;

    public AuiCheckBox()
    {
    }

    public AuiCheckBox(final String labelText, final String name)
    {
        setLabel(labelText);
        setName(name);
    }

    @Override
    protected Class<Boolean> getInputWidgetDataClass()
    {
        return Boolean.class;
    }

    @Override
    protected Widget createAndBindUi()
    {
        return uiBinder.createAndBindUi(this);
    }

    @Override
    public HasValue<Boolean> getInputWidget()
    {
        return input;
    }

    @Override
    public void setValue(Boolean value, boolean fireEvents)
    {
        if (value == null)
        {
            value = Boolean.FALSE;
        }
        super.setValue(value, fireEvents);
    }

    @Override
    public Boolean getValue()
    {
        Boolean result = super.getValue();
        if (result == null)
        {
            return Boolean.FALSE;
        }
        else
        {
            return result;
        }
    }
}