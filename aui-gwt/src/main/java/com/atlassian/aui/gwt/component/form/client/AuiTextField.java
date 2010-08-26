package com.atlassian.aui.gwt.component.form.client;

import com.google.gwt.core.client.GWT;
import com.google.gwt.uibinder.client.UiBinder;
import com.google.gwt.uibinder.client.UiField;
import com.google.gwt.user.client.ui.HTMLPanel;
import com.google.gwt.user.client.ui.HasValue;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.Widget;


/**
 * TODO: Document this class / interface here
 *
 * @since v4.0
 */
public class AuiTextField extends AuiField<String>
{
    private static UiBuilder uiBinder = GWT.create(UiBuilder.class);

    interface UiBuilder extends UiBinder<HTMLPanel, AuiTextField>
    {
    }


    @UiField
    TextBox input;

    public AuiTextField()
    {
    }

    @Override
    protected Class<String> getInputWidgetDataClass()
    {
        return String.class;
    }

    public AuiTextField(final String labelText, final String name, final boolean isRequired)
    {
        setLabel(labelText);
        setName(name);
        setRequired(isRequired);
    }

    @Override
    protected Widget createAndBindUi()
    {
        return uiBinder.createAndBindUi(this);
    }

    @Override
    public HasValue<String> getInputWidget()
    {
        return input;
    }


}