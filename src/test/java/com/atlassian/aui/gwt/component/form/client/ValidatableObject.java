package com.atlassian.aui.gwt.component.form.client;

import com.google.gwt.validation.client.NotEmpty;
import com.google.gwt.validation.client.NotNull;
import com.google.gwt.validation.client.interfaces.IValidatable;

public class ValidatableObject implements IValidatable
{
    @NotNull
    @NotEmpty
    private String name;

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }
}
