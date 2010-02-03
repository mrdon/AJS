package com.atlassian.aui.gwt.component.form.client;

import com.google.gwt.junit.client.GWTTestCase;
import com.google.gwt.user.client.ui.RootPanel;
import com.google.gwt.user.client.ui.UIObject;

public class TestAuiForm extends GWTTestCase
{
    @Override
    public String getModuleName()
    {
        return "com.atlassian.aui.gwt.AUItest";
    }

    public void testAutoIdWithFormId()
    {
        AuiForm form = new AuiForm();
        AuiFieldSet fs = new AuiFieldSet();
        AuiTextField field = new AuiTextField();
        fs.add(field);
        form.add(fs);
        form.setId("bob");
        field.setName("jim");
        RootPanel.get().add(form);
        assertEquals("bob-jim", ((UIObject)field.getInputWidget()).getElement().getId());
    }

    public void testAutoIdWithNoFormId()
    {
        AuiForm form = new AuiForm();
        AuiFieldSet fs = new AuiFieldSet();
        AuiTextField field = new AuiTextField();
        fs.add(field);
        form.add(fs);
        form.setId("bob");
        RootPanel.get().add(form);
        assertEquals("",(((UIObject)field.getInputWidget()).getElement().getId()));
    }

}
