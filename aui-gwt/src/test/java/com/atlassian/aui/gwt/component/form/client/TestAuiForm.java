package com.atlassian.aui.gwt.component.form.client;

import com.google.gwt.core.client.GWT;
import com.google.gwt.dom.client.Element;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.junit.client.GWTTestCase;
import com.google.gwt.user.client.ui.FormPanel;
import com.google.gwt.user.client.ui.RootPanel;
import com.google.gwt.user.client.ui.UIObject;
import com.google.gwt.validation.client.interfaces.IValidator;


public class TestAuiForm extends GWTTestCase
{

    private boolean calledFlag = false;
    private AuiForm form;
    private AuiTextField nameField;
    private AuiFieldSet fs;

    @Override
    protected void gwtSetUp() throws Exception
    {
        super.gwtSetUp();
        calledFlag = false;
        form = new AuiForm();

        fs = new AuiFieldSet();
        nameField = new AuiTextField();
        nameField.setName("name");
        fs.add(nameField);
        form.add(fs);
        form.setId("bob");
    }

    @Override
    public String getModuleName()
    {
        return "com.atlassian.aui.gwt.AUItest";
    }

    public void testAutoIdWithFormId()
    {
        RootPanel.get().add(form);
        assertEquals("bob-name", ((UIObject)nameField.getInputWidget()).getElement().getId());

    }

    public void testAutoIdWithNoFormId()
    {
        form.setId("");
        RootPanel.get().add(form);
        assertEquals("name",(((UIObject)nameField.getInputWidget()).getElement().getId()));
    }

    public void testValidationFailed()
    {
        ObjectModelProvider objectProvider = GWT.create(ObjectModelProvider.class);
        objectProvider.setBean(new ValidatableObject());
        form.bind(objectProvider, GWT.<IValidator>create(ValidatableObject.class));

        RootPanel.get().add(form);
        FormPanel.SubmitHandler resetHandler = new FormPanel.SubmitHandler()
        {
            public void onSubmit(FormPanel.SubmitEvent event)
            {
                calledFlag = true;
            }
        };
        form.addSubmitHandler(resetHandler);
        form.getSubmitButton().click();
        assertFalse(calledFlag);
        assertNotNull(nameField.getError());
    }

    public void testValidationPassed()
    {
        ObjectModelProvider objectProvider = GWT.create(ObjectModelProvider.class);
        objectProvider.setBean(new ValidatableObject());
        form.bind(objectProvider, GWT.<IValidator>create(ValidatableObject.class));
        nameField.setValue("bob", true);

        RootPanel.get().add(form);
        FormPanel.SubmitHandler resetHandler = new FormPanel.SubmitHandler()
        {
            public void onSubmit(FormPanel.SubmitEvent event)
            {
                calledFlag = true;
                event.cancel();
            }
        };
        form.addSubmitHandler(resetHandler);
        form.getSubmitButton().click();
        assertEquals("", nameField.getError());
        assertTrue(calledFlag);
    }

    public void testBindWithNewFormField()
    {
        AuiTextField field2 = new AuiTextField();
        field2.setName("bob");
        fs.add(field2);

        ObjectModelProvider objectProvider = GWT.create(ObjectModelProvider.class);
        final ValidatableObject obj = new ValidatableObject();
        objectProvider.setBean(obj);
        form.bind(objectProvider, GWT.<IValidator>create(ValidatableObject.class));

        nameField.setValue("jim", true);
        objectProvider.commit();
        assertEquals("jim", obj.getName());

        try
        {
            field2.setValue("jim", true);
        }
        catch (Exception ex)
        {
            fail("Should support fields with no model backend");
        }
    }

    public void testBindWithUnknownModelProperty()
    {
        fs.clear();
        ObjectModelProvider objectProvider = GWT.create(ObjectModelProvider.class);
        final ValidatableObject obj = new ValidatableObject();
        objectProvider.setBean(obj);
        try
        {
            form.bind(objectProvider, GWT.<IValidator>create(ValidatableObject.class));
        }
        catch (Exception ex)
        {
            fail("Should support models with unknown fields");
        }
    }

    public void testSubmitWithNoBoundModel()
    {
        RootPanel.get().add(form);
        FormPanel.SubmitHandler resetHandler = new FormPanel.SubmitHandler()
        {
            public void onSubmit(FormPanel.SubmitEvent event)
            {
                calledFlag = true;
                event.cancel();
            }
        };
        form.addSubmitHandler(resetHandler);
        form.getSubmitButton().click();
        assertTrue(calledFlag);
    }

    public void testResetCalledHandlers()
    {
        RootPanel.get().add(form);
        AuiForm.ResetHandler resetHandler = new AuiForm.ResetHandler()
        {
            public void onReset(AuiForm.ResetEvent resetEvent)
            {
                calledFlag = true;
            }
        };
        form.addResetHandler(resetHandler);
        click(form.getResetLink().getElement());
        //form.getResetLink().click();
        assertTrue(calledFlag);
    }

    private static native void click(Element anchor)/*-{
        var myEvt = document.createEvent('MouseEvents');
        myEvt.initEvent(
           'click'      // event type
           ,true      // can bubble?
           ,true      // cancelable?
        );
        anchor.dispatchEvent(myEvt);
      }-*/;


}
