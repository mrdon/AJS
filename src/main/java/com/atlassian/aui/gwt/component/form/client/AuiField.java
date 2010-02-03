package com.atlassian.aui.gwt.component.form.client;

import com.google.gwt.dom.client.LabelElement;
import com.google.gwt.dom.client.SpanElement;
import com.google.gwt.event.logical.shared.ValueChangeHandler;
import com.google.gwt.event.shared.HandlerRegistration;
import com.google.gwt.uibinder.client.UiField;
import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.HasValue;
import com.google.gwt.user.client.ui.Widget;
import com.pietschy.gwt.pectin.client.validation.ValidationResult;
import com.pietschy.gwt.pectin.client.validation.component.ValidationDisplay;

/**
 * TODO: Document this class / interface here
 *
 * @since v4.0
 */
public abstract class AuiField<T> extends Composite implements ValidationDisplay, HasValue<T>
{

    @UiField
    LabelElement label;
    @UiField
    SpanElement required;
    @UiField
    SpanElement error;
    @UiField
    SpanElement description;

    private String name;
    private String id;

    protected AuiField()
    {
        this(true);
    }

    protected AuiField(boolean initWidget)
    {
        if (initWidget)
        {
            initWidget(createAndBindUi());
            init();
        }
    }

    protected void init()
    {
        this.label.appendChild(required);
        this.required.addClassName("hidden");
        this.error.addClassName("hidden");
        this.description.addClassName("hidden");
    }


    protected abstract Class<T> getInputWidgetDataClass();

    public void setName(String name)
    {
        Widget input = (Widget) getInputWidget();
        input.getElement().setAttribute("name", name);
        this.name = name;
    }

    public void setRequired(boolean isRequired)
    {
        if (isRequired)
        {
            required.removeClassName("hidden");
        }
    }

    public void setLabel(String labelText)
    {
        this.label.setInnerText(labelText);
    }

    @Override
    protected void onAttach()
    {
        super.onAttach();
        if (id == null && name != null)
        {
            String formId = ((AuiForm)getParent().getParent().getParent()).getId();
            if (formId != null)
            {
                setId(getNamespacedId(formId, name));
            }
        }
    }

    protected abstract Widget createAndBindUi();

    protected String getNamespacedId(String formId, String name)
    {
        return (formId != null && formId.length() > 0 ? formId + "-" : "") + name;
    }

    public abstract HasValue<T> getInputWidget();


    public void setDescription(final String descriptionText)
    {
        this.description.setInnerHTML(descriptionText);
        this.description.removeClassName("hidden");
    }

    public void setError(final String errorText)
    {
        this.error.setInnerText(errorText);
        this.error.removeClassName("hidden");
    }

    public void clearError()
    {
        this.error.setInnerText("");
        this.error.addClassName("hidden");
    }

    public void setValidationResult(ValidationResult validationResult)
    {
        if (validationResult.getMessages().size() > 0)
        {
            setError(validationResult.getMessages().get(0).getMessage());
        }
    }

    // delegates for underlying control

    public T getValue()
    {
        return getInputWidget().getValue();
    }

    public void setValue(T value)
    {
        getInputWidget().setValue(value);
    }

    public void setValue(T value, boolean fireEvents)
    {
        getInputWidget().setValue(value, fireEvents);
    }

    public HandlerRegistration addValueChangeHandler(ValueChangeHandler<T> tValueChangeHandler)
    {
        return getInputWidget().addValueChangeHandler(tValueChangeHandler);
    }

    public String getName()
    {
        return name;
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
        this.label.setAttribute("for", id);
        Widget input = (Widget) getInputWidget();
        input.getElement().setId(id);
    }
}