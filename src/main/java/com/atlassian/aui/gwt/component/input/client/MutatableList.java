package com.atlassian.aui.gwt.component.input.client;

import com.atlassian.aui.gwt.component.general.client.UnorderedList;
import com.atlassian.aui.gwt.component.input.client.ItemAddedEvent;
import com.atlassian.aui.gwt.component.input.client.ItemAddedHandler;
import com.atlassian.aui.gwt.component.input.client.ItemRemovedEvent;
import com.atlassian.aui.gwt.component.input.client.ItemRemovedHandler;
import com.atlassian.aui.gwt.util.client.AuiResources;
import com.atlassian.aui.gwt.util.client.WidgetFinder;
import com.google.gwt.core.client.GWT;
import com.google.gwt.dom.client.DivElement;
import com.google.gwt.dom.client.HeadingElement;
import com.google.gwt.dom.client.LabelElement;
import com.google.gwt.dom.client.StyleInjector;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.event.dom.client.KeyCodes;
import com.google.gwt.event.dom.client.KeyPressEvent;
import com.google.gwt.event.dom.client.KeyPressHandler;
import com.google.gwt.event.logical.shared.ValueChangeEvent;
import com.google.gwt.event.logical.shared.ValueChangeHandler;
import com.google.gwt.event.shared.DefaultHandlerRegistration;
import com.google.gwt.event.shared.HandlerRegistration;
import com.google.gwt.uibinder.client.UiBinder;
import com.google.gwt.uibinder.client.UiFactory;
import com.google.gwt.uibinder.client.UiField;
import com.google.gwt.user.client.DOM;
import com.google.gwt.user.client.Element;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.HTMLPanel;
import com.google.gwt.user.client.ui.HasValue;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.MultiWordSuggestOracle;
import com.google.gwt.user.client.ui.SuggestBox;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.google.gwt.user.client.ui.Widget;

import java.util.ArrayList;
import java.util.List;


public class MutatableList extends Composite implements HasValue<List>
{
    private List<String> suggestListData;

    interface MutatableListFormBinder extends UiBinder<HTMLPanel, MutatableList>
    {
    }

    private static MutatableListFormBinder uiBinder = GWT.create(MutatableListFormBinder.class);

    @UiField
    UnorderedList list;

    @UiField
    SuggestBox suggestBox;
    @UiField
    Button addButton;

    @UiField
    HeadingElement title;
    @UiField
    LabelElement addLabel;

    public MutatableList(List<String> suggestListData)
    {
        StyleInjector.inject(AuiResources.INSTANCE.css().getText());
        this.suggestListData = suggestListData;
        initWidget(uiBinder.createAndBindUi(this));
        getElement().addClassName("mutatable-list");

        suggestBox.addKeyPressHandler(new KeyPressHandler()
        {
            public void onKeyPress(KeyPressEvent event)
            {
                if (!suggestBox.isSuggestionListShowing() &&
                        suggestBox.getValue().length() > 0 && 
                        KeyCodes.KEY_ENTER == event.getNativeEvent().getKeyCode())
                {
                    final String groupName = suggestBox.getValue();
                    suggestBox.setText("");
                    fireEvent(new ItemAddedEvent(groupName));
                }
            }
        });

        addButton.addClickHandler(new ClickHandler()
        {
            public void onClick(ClickEvent event)
            {
                final String groupName = suggestBox.getValue();
                suggestBox.setText("");
                fireEvent(new ItemAddedEvent(groupName));
            }
        });
        this.title.addClassName("hidden");

        String name = DOM.createUniqueId();
        this.addLabel.setAttribute("for", name);
        this.suggestBox.getTextBox().getElement().setAttribute("id", name);
    }

    @Override
    public void setTitle(String title)
    {
        this.title.setInnerText(title);
        this.title.removeClassName("hidden");
    }

    public void setAddLabel(String label)
    {
        this.addLabel.setInnerText(label);
        this.addButton.setText(label);
    }

    public List getValue()
    {
        final List result = new ArrayList();
        WidgetFinder.forEachChildRecursivly(list, new WidgetFinder.WidgetCallback()
        {
            public boolean handle(Widget widget)
            {
                if (widget instanceof HTMLPanel)
                {
                    result.add(widget.getElement().getInnerText());
                }
                return false;
            }
        });
        return result;
    }

    public void setValue(List value)
    {
        setValue(value, false);
    }

    public void setValue(List value, boolean fireEvents)
    {
        if (value != null)
        {
            for (Object obj : value)
            {
                addItem(obj.toString());
            }
        }
    }

    public HandlerRegistration addValueChangeHandler(final ValueChangeHandler<List> listValueChangeHandler)
    {
        // probably a horrible way of doing this
        final HandlerRegistration addReg = addItemAddedHandler(new ItemAddedHandler()
        {
            public void onItemAdded(ItemAddedEvent itemAddedEvent)
            {
                listValueChangeHandler.onValueChange(new ValueChangeEvent(getValue()){});
            }
        });
        final HandlerRegistration remReg = addItemRemovedHandler(new ItemRemovedHandler()
        {
            public void onItemRemoved(ItemRemovedEvent itemRemovedEvent)
            {
                listValueChangeHandler.onValueChange(new ValueChangeEvent(getValue()){});
            }
        });
        return new HandlerRegistration()
        {

            public void removeHandler()
            {
                addReg.removeHandler();
                remReg.removeHandler();
            }
        };
    }

    public HandlerRegistration addItemAddedHandler(ItemAddedHandler itemAddedHandler)
    {
        return addHandler(itemAddedHandler, ItemAddedEvent.getType());
    }

    public HandlerRegistration addItemRemovedHandler(ItemRemovedHandler itemRemovedHandler)
    {
        return addHandler(itemRemovedHandler, ItemRemovedEvent.getType());
    }


    public void addItem(final String group)
    {
        Button del = new Button("Delete");
        del.addClickHandler(new ClickHandler()
        {
            public void onClick(ClickEvent event)
            {
                fireEvent(new ItemRemovedEvent(group));
            }
        });

        final HTMLPanel label = new HTMLPanel("span", group);
        label.getElement().addClassName("inline-text");
        list.add(label, del);
    }

    public void removeItem(final String group)
    {
        WidgetFinder.forEachChildRecursivly(list, new WidgetFinder.WidgetCallback()
        {
            public boolean handle(Widget widget)
            {
                if (widget instanceof HTMLPanel)
                {
                    String name = widget.getElement().getInnerText();
                    if (name.equals(group))
                    {
                        list.remove(widget.getElement().getParentElement());
                    }
                }
                return false;
            }
        });
    }

    @UiFactory
    SuggestBox createSuggestBox()
    {
        MultiWordSuggestOracle oracle = new MultiWordSuggestOracle();
        oracle.addAll(suggestListData);
        return new SuggestBox(oracle);
    }

}