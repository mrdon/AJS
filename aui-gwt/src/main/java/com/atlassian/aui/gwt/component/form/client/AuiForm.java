package com.atlassian.aui.gwt.component.form.client;

import com.google.gwt.core.client.GWT;
import com.google.gwt.dom.client.DivElement;
import com.google.gwt.dom.client.Element;
import com.google.gwt.dom.client.FormElement;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.event.shared.EventHandler;
import com.google.gwt.event.shared.GwtEvent;
import com.google.gwt.event.shared.HandlerRegistration;
import com.google.gwt.uibinder.client.UiBinder;
import com.google.gwt.uibinder.client.UiField;
import com.google.gwt.user.client.ui.Anchor;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.CheckBox;
import com.google.gwt.user.client.ui.ComplexPanel;
import com.google.gwt.user.client.ui.FormPanel;
import com.google.gwt.user.client.ui.HasText;
import com.google.gwt.user.client.ui.HasValue;
import com.google.gwt.user.client.ui.Widget;
import com.google.gwt.validation.client.InvalidConstraint;
import com.google.gwt.validation.client.interfaces.IValidator;
import com.pietschy.gwt.pectin.client.FieldModel;
import com.pietschy.gwt.pectin.client.FieldModelImpl;
import com.pietschy.gwt.pectin.client.FormModel;
import com.pietschy.gwt.pectin.client.bean.BeanModelProvider;
import com.pietschy.gwt.pectin.client.bean.UnknownPropertyException;
import com.pietschy.gwt.pectin.client.binding.WidgetBinder;
import com.atlassian.aui.gwt.util.client.WidgetFinder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class AuiForm<T> extends ComplexPanel
{

    @UiField
    Anchor cancelLink;

    @UiField
    DivElement submitBar;

    @UiField
    FormElement formElement;

    @UiField
    Button submitButton;

    InternalFormPanel form;

    final List<AuiFieldSet> fieldSets = new ArrayList<AuiFieldSet>();

    private IValidator validator;
    private BeanModelProvider<T> provider;

    public Anchor getResetLink()
    {
        return cancelLink;
    }

    public static interface ResetHandler extends EventHandler
    {
        void onReset(ResetEvent resetEvent);
    }

    interface AuiFormBinder extends UiBinder<AdoptableHTMLPanel, AuiForm>
    {

    }

    /**
     * Fired when the form is resetted.
     */
    public static class ResetEvent extends GwtEvent<ResetHandler>
    {
        /**
         * The event type.
         */
        private static Type<ResetHandler> TYPE = new Type<ResetHandler>();

        /**
         * Handler hook.
         *
         * @return the handler hook
         */
        static Type<ResetHandler> getType()
        {
            if (TYPE == null)
            {
                TYPE = new Type<ResetHandler>();
            }
            return TYPE;
        }

        @Override
        public final Type<ResetHandler> getAssociatedType()
        {
            return TYPE;
        }

        @Override
        protected void dispatch(ResetHandler handler)
        {
            handler.onReset(this);
        }
    }

    private static AuiFormBinder uiBinder = GWT.create(AuiFormBinder.class);

    AdoptableHTMLPanel panel;

    public AuiForm()
    {
        panel = uiBinder.createAndBindUi(this);

        getChildren().add(panel);
        adopt(panel);

        setElement(panel.getElement());
        form = new InternalFormPanel(formElement, false);
        submitButton.addClickHandler(new ClickHandler()
        {
            public void onClick(ClickEvent event)
            {
                event.stopPropagation();
                if (onFormSubmit())
                {
                    form.submit();
                }

            }
        });
        panel.adoptInsertedWidget(form);
        cancelLink.addClickHandler(new ClickHandler()
        {
            public void onClick(ClickEvent event)
            {
                form.reset();
                if (provider != null)
                {
                    provider.revert();
                }
                clearErrors();
                fireResetEvent();
            }
        });
    }

    /**
     * Autobinds the bean model to the form by matching bean properties with form fields and sets the model validator.
     * The bean properties must match the data type of the form fields exactly.  Also, in order to run the validation,
     * the changes from the form fields will be committed to the bean model, so even if the validation fails, the
     * underlying model will be affected.
     *
     * The binding tries to find all {@link HasValue} instances who's element contains a value for the 'name' attribute
     * recursively within this form.  This is to allow arbitrary form widgets in an arbitrary structure outside the
     * usual {@link AuiFieldSet} components.
     *
     * The {@link BeanModelProvider} is initialized like so:
     * <pre>
     * public static abstract class MyModelProvider extends BeanModelProvider<MyModel> {}
     * private MyModelProvider myProvider = GWT.create(MyModelProvider.class);
     * </pre>
     * The {@link IValidator} needs to be initialized via:
     * <pre>
     * GWT.<IValidator>create(MyModel.class)
     * </pre>
     *
     * @param provider The provider that manages the bean model
     * @param validator The validator for the bean model.
     */
    public void bind(final BeanModelProvider<T> provider, IValidator validator)
    {
        this.validator = validator;
        this.provider = provider;
        final WidgetBinder binder = new WidgetBinder();
        final FormModel formModel = new FormModel();

        WidgetFinder.forEachChildRecursivly(this, new WidgetFinder.WidgetCallback()
        {
            public boolean handle(Widget widget)
            {
                String inputName = guessInputName(widget);
                
                if (widget instanceof HasValue && inputName != null)
                {
                    HasValue field = (HasValue) widget;
                    Class inputWidgetDataClass = guessInputWidgetDataType(field);
                    try
                    {
                        FieldModel fieldModel = new FieldModelImpl(formModel, provider.getValueModel(inputName, inputWidgetDataClass), inputWidgetDataClass);
                        binder.bind(fieldModel).to(field);
                    }
                    catch (UnknownPropertyException ex)
                    {
                        // The property doesn't exist on the model bean, which we'll allow
                        // TODO: log this somehow
                    }

                    // Don't examine this fields' widgets
                    return false;
                }
                return true;
            }
        });
    }

    public Button getSubmitButton()
    {
        return submitButton;
    }

    private String guessInputName(Widget widget)
    {
        if (widget instanceof AuiField)
        {
            return ((AuiField)widget).getName();
        }
        else
        {
            return widget.getElement().getAttribute("name");
        }
    }

    public HandlerRegistration addResetHandler(ResetHandler resetHandler)
    {
        return addHandler(resetHandler, ResetEvent.getType());
    }

    /**
     * Fire a {@link ResetEvent}.
     *
     * @return true to continue, false if canceled
     */
    private void fireResetEvent()
    {
        ResetEvent event = new ResetEvent();
        fireEvent(event);
    }

    public void add(Widget widget)
    {
        AuiFieldSet fieldSet = (AuiFieldSet) widget;
        formElement.insertBefore(fieldSet.getElement(), submitBar);
        panel.adoptInsertedWidget(fieldSet);
        fieldSets.add(fieldSet);
    }

    public void setSaveButtonText(String label)
    {
        submitButton.setText(label);
    }

    public void setCancelLinkVisible(boolean value)
    {
        cancelLink.setVisible(value);
    }

    public void clearErrors()
    {
        for (AuiFieldSet fs : fieldSets)
        {
            for (Widget fWidget : fs)
            {
                if (fWidget instanceof AuiField)
                {
                    AuiField field = (AuiField) fWidget;
                    field.clearError();
                }
            }
        }
    }

    public void renderErrors(Map<String, String> errors)
    {
        clearErrors();

        for (AuiFieldSet fs : fieldSets)
        {
            for (Widget fWidget : fs)
            {
                if (fWidget instanceof AuiField)
                {
                    AuiField field = (AuiField) fWidget;
                    if (errors.containsKey(field.getName()))
                    {
                        field.setError(errors.get(field.getName()));
                    }
                }
            }
        }
    }

    public void setId(String id)
    {
        this.formElement.setAttribute("id", id);
    }

    public String getId()
    {
        return this.formElement.getAttribute("id");
    }

    private AuiField getField(String name)
    {
        for (AuiFieldSet fs : fieldSets)
        {
            for (Widget fWidget : fs)
            {
                if (fWidget instanceof AuiField)
                {
                    AuiField field = (AuiField) fWidget;
                    if (field.getName().equals(name))
                    {
                        return field;
                    }
                }
            }
        }
        throw new IllegalArgumentException("Missing field: " + name);
    }

    private Class guessInputWidgetDataType(HasValue widget)
    {
        if (widget instanceof HasText)
        {
            return String.class;
        }
        else if (widget instanceof CheckBox)
        {
            return Boolean.class;
        }
        else if (widget instanceof AuiField)
        {
            return ((AuiField)widget).getInputWidgetDataClass();   
        }
        else
        {
            throw new IllegalArgumentException("Unable to guess data type for widget " + widget);
        }

    }

    // --- Delegates for FormPanel

    public HandlerRegistration addSubmitCompleteHandler(FormPanel.SubmitCompleteHandler handler)
    {
        return form.addSubmitCompleteHandler(handler);
    }

    public HandlerRegistration addSubmitHandler(FormPanel.SubmitHandler handler)
    {
        return form.addSubmitHandler(handler);
    }

    public String getAction()
    {
        return form.getAction();
    }

    public String getEncoding()
    {
        return form.getEncoding();
    }

    public String getMethod()
    {
        return form.getMethod();
    }

    public String getTarget()
    {
        return form.getTarget();
    }

    public void setName(String name)
    {
        form.getElement().setAttribute("name", name);
    }

    public boolean onFormSubmit()
    {
        clearErrors();
        if (provider != null)
        {
            provider.commit();
            if (validator != null)
            {
                Set<InvalidConstraint> invalidConstraints = validator.validate(provider.getBean());
                if (!invalidConstraints.isEmpty())
                {
                    for (InvalidConstraint ic : invalidConstraints)
                    {
                        getField(ic.getPropertyPath()).setError(ic.getMessage());
                    }

                    System.out.println("Validation failed");
                    return false;
                }
            }
        }

        return form.superOnFormSubmit();
    }

    public void onFrameLoad()
    {
        form.onFrameLoad();
    }

    public void reset()
    {
        form.reset();
    }

    public void setAction(String url)
    {
        form.setAction(url);
    }

    public void setEncoding(String encodingType)
    {
        form.setEncoding(encodingType);
    }

    public void setMethod(String method)
    {
        form.setMethod(method);
    }

    public void submit()
    {
        form.submit();
    }

    private final class InternalFormPanel extends FormPanel
    {
        protected InternalFormPanel(Element element, boolean createIFrame)
        {
            super(element, createIFrame);
        }

        @Override
        public boolean onFormSubmit()
        {
            return AuiForm.this.onFormSubmit();
        }

        public boolean superOnFormSubmit()
        {
            return super.onFormSubmit();
        }


    }

}
