package com.atlassian.aui.gwt.rpc.server;

import com.google.gwt.user.server.rpc.RPCRequest;
import com.google.gwt.user.server.rpc.RemoteServiceServlet;
import org.apache.commons.lang.Validate;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public abstract class VerifiedRemoteServiceServlet extends RemoteServiceServlet implements ApplicationContextAware, InitializingBean
{
    private Collection<RequestVerifier> verifiers;
    private Collection<Class<? extends RequestVerifier>> verifierClasses;
    private ApplicationContext applicationContext;

    @Override
    protected void onAfterRequestDeserialized(RPCRequest rpcRequest)
    {
        if (verifiers != null)
        {
            for (RequestVerifier verifier : verifiers)
            {
                verifier.verify(rpcRequest, this);
            }
        }
        super.onAfterRequestDeserialized(rpcRequest);
    }

    public void setVerifiers(Class<? extends RequestVerifier>... verifiers)
    {
        Validate.notNull(verifiers);
        this.verifierClasses = Arrays.asList(verifiers);
    }

    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException
    {
        this.applicationContext = applicationContext;
    }

    public void afterPropertiesSet() throws Exception
    {
        Validate.notNull(applicationContext);

        List<RequestVerifier> list = new ArrayList<RequestVerifier>();
        if (verifierClasses != null)
        {
            for (Class<? extends RequestVerifier> verifier : verifierClasses)
            {
                list.add((RequestVerifier) applicationContext.getAutowireCapableBeanFactory().createBean(verifier, AutowireCapableBeanFactory.AUTOWIRE_AUTODETECT, false));
            }
        }
        this.verifiers = list;
    }
}
