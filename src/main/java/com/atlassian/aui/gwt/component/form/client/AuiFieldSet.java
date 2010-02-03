package com.atlassian.aui.gwt.component.form.client;

import com.google.gwt.core.client.GWT;
import com.google.gwt.dom.client.FieldSetElement;
import com.google.gwt.dom.client.HeadingElement;
import com.google.gwt.uibinder.client.UiBinder;
import com.google.gwt.uibinder.client.UiField;
import com.google.gwt.user.client.ui.ComplexPanel;

public class AuiFieldSet extends ComplexPanel
{
    interface AuiFieldSetBinder extends UiBinder<FieldSetElement, AuiFieldSet>
    {
    }

    private static AuiFieldSetBinder uiBinder = GWT.create(AuiFieldSetBinder.class);

    @UiField
    HeadingElement title;

    @UiField
    FieldSetElement fieldSet;

    public AuiFieldSet()
    {
        setElement(uiBinder.createAndBindUi(this));
    }

    public AuiFieldSet(String titleValue)
    {
        this();
        setTitle(titleValue);
    }

    public void setTitle(String titleValue)
    {
        title.setInnerText(titleValue);
    }

    public void add(AuiField child)
    {
        super.add(child, getElement());
    }
}
