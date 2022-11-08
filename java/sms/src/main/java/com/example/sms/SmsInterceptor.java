package com.example.sms;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ws.client.WebServiceClientException;
import org.springframework.ws.client.support.interceptor.ClientInterceptor;
import org.springframework.ws.context.MessageContext;
import org.springframework.ws.soap.SoapBody;
import org.springframework.ws.soap.SoapEnvelope;
import org.springframework.ws.soap.SoapFault;
import org.springframework.ws.soap.SoapMessage;

public class SmsInterceptor implements ClientInterceptor {

    private static final Logger LOGGER = LoggerFactory.getLogger(SmsInterceptor.class);

    @Override
    public boolean handleRequest(MessageContext messageContext) throws WebServiceClientException {
        return true;
    }

    @Override
    public boolean handleResponse(MessageContext messageContext) throws WebServiceClientException {

        return true;
    }

    @Override
    public boolean handleFault(MessageContext messageContext) throws WebServiceClientException {

        LOGGER.info("intercepted a fault...");
        SoapBody soapBody = getSoapBody(messageContext);
        SoapFault soapFault = soapBody.getFault();
        LOGGER.error(soapFault.getFaultStringOrReason());
        throw new RuntimeException(
                String.format("Error occured while invoking SOAP service - %s ", soapFault.getFaultStringOrReason()));
    }

    @Override
    public void afterCompletion(MessageContext messageContext, Exception ex) throws WebServiceClientException {

    }

    private SoapBody getSoapBody(MessageContext messageContext) {
        SoapMessage soapMessage = (SoapMessage) messageContext.getResponse();
        SoapEnvelope soapEnvelope = soapMessage.getEnvelope();
        return soapEnvelope.getBody();
    }
}
