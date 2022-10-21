package com.example.sms;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.ws.WebServiceMessage;
import org.springframework.ws.client.core.WebServiceMessageCallback;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

import java.util.Arrays;

import javax.xml.soap.*;
import org.springframework.ws.soap.saaj.SaajSoapMessage;

import com.example.consumingwebservice.wsdl.SendChiSMS;
import com.example.consumingwebservice.wsdl.SendChiSMSResponse;
import com.example.consumingwebservice.wsdl.ArrayOfString;

@Component
public class SmsClientChi extends WebServiceGatewaySupport {

    private static final Logger log = LoggerFactory.getLogger(SmsClientChi.class);

    public SendChiSMSResponse sendSms(String content, String callerApi, String[] phones, boolean isTest) {
        SendChiSMS request = new SendChiSMS();
        ArrayOfString phoneNos = new ArrayOfString();
        phoneNos.getString().addAll(Arrays.asList(phones));
        request.setContent(content);
        request.setPhoneNos(phoneNos);
        request.setTestOnly(true);
        request.setCallerkey(callerApi);
        request.setArraySize(phoneNos.getString().size());
        request.setTestOnly(isTest);
        log.info("sending SMS to " + request.getPhoneNos().getString());
        log.info(String.format("with Chinese message {%s}", request.getContent()));

        SendChiSMSResponse response = (SendChiSMSResponse) getWebServiceTemplate().marshalSendAndReceive(
                /* "https://cap.cityu.edu.hk/sms/cityusms.asmx", */"http://localhost:5000/s",
                request, new WebServiceMessageCallback() {

                    @Override
                    public void doWithMessage(WebServiceMessage message) {
                        try {
                            SaajSoapMessage saajSoapMessage = (SaajSoapMessage) message;

                            SOAPMessage soapMessage = saajSoapMessage.getSaajMessage();

                            SOAPPart soapPart = soapMessage.getSOAPPart();

                            SOAPEnvelope soapEnvelope = soapPart.getEnvelope();

                            soapMessage.saveChanges();
                            saajSoapMessage.setSoapAction("http://tempuri.org/SendChiSMS");

                        } catch (Exception e) {
                            throw new RuntimeException("TokenHeaderRequestCallback", e);
                        }
                    }
                });
        log.info("The sms id is " + response.getSendChiSMSResult());
        if (response.getSendChiSMSResult().isEmpty()) {
            log.info("Request may encounter an error and cannot be sent / received");
        }

        return response;
    }
}