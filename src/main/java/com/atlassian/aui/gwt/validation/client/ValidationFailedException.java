package com.atlassian.aui.gwt.validation.client;

import com.google.gwt.user.client.rpc.IsSerializable;
import com.google.gwt.validation.client.InvalidConstraint;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class ValidationFailedException extends Exception implements IsSerializable
{
    private Map<String, String> errors = new HashMap<String, String>();

    public ValidationFailedException(Set<InvalidConstraint> errors)
    {
        for (InvalidConstraint ic : errors)
        {
            this.errors.put(ic.getPropertyPath(), ic.getMessage());
        }
    }

    public ValidationFailedException()
    {
    }

    public Map<String, String> getErrors()
    {
        return errors;
    }

}
