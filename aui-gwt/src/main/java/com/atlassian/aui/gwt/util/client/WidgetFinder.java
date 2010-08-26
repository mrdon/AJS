package com.atlassian.aui.gwt.util.client;

import com.google.gwt.user.client.ui.HasWidgets;
import com.google.gwt.user.client.ui.Widget;

public class WidgetFinder
{
    public static interface WidgetCallback
    {
        /**
         * @param widget The widget to examine
         * @return True if the widget should be searched recursively
         */
        boolean handle(Widget widget);
    }
    public static void forEachChildRecursivly(HasWidgets parent, WidgetCallback callback)
    {
        if (parent == null)
        {
            return;
        }

        for (Widget child : parent)
        {
            if (callback.handle(child))
            {
                if (child instanceof HasWidgets)
                {
                    forEachChildRecursivly((HasWidgets) child, callback);
                }
            }
        }
    }

}
