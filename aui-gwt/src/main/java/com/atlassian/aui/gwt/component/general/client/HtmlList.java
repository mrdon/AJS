package com.atlassian.aui.gwt.component.general.client;

import java.util.HashMap;
import java.util.Map;

import com.google.gwt.dom.client.Document;
import com.google.gwt.dom.client.Element;
import com.google.gwt.dom.client.LIElement;
import com.google.gwt.user.client.Command;
import com.google.gwt.user.client.DeferredCommand;
import com.google.gwt.user.client.Event;
import com.google.gwt.user.client.ui.ComplexPanel;
import com.google.gwt.user.client.ui.Widget;

public abstract class HtmlList extends ComplexPanel
{
	public static enum ListType {
		UNORDERED {
			public Element createElement() {
				return Document.get().createULElement();
			}
		},
		ORDERED {
			public Element createElement() {
				return Document.get().createULElement();
			}
		};
		
		public abstract Element createElement();
	}
	
	public HtmlList(ListType listType) {
		setElement(listType.createElement());
		setStylePrimaryName("html-list");
	}
	
	public void addItem(String text) {
		LIElement liElement = Document.get().createLIElement();
		liElement.setInnerText(text);
		getElement().appendChild(liElement);

	}

    public void remove(Element e)
    {
        getElement().removeChild(e);
    }

    public void add(Widget... child)
    {
        LIElement liElement = Document.get().createLIElement();
        getElement().appendChild(liElement);
        for (Widget kid : child)
        {
            super.add(kid, liElement.<com.google.gwt.user.client.Element>cast());
        }
    }
}
