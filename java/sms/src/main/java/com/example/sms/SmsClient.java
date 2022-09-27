package com.example.sms;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ws.WebServiceMessage;
import org.springframework.ws.client.core.WebServiceMessageCallback;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import org.springframework.ws.soap.SoapHeader;
import javax.xml.soap.*;
import org.springframework.ws.soap.saaj.SaajSoapMessage;

import com.example.consumingwebservice.wsdl.SendEngSMS;
import com.example.consumingwebservice.wsdl.SendEngSMSResponse;
import com.example.consumingwebservice.wsdl.ArrayOfString;

public class SmsClient extends WebServiceGatewaySupport {

    private static final Logger log = LoggerFactory.getLogger(SmsClient.class);

    public SendEngSMSResponse sendSms() {
        SendEngSMS request = new SendEngSMS();
        request.setContent("value");
        request.setPhoneNos(new ArrayOfString());
        request.setTestOnly(true);
        request.setCallerkey("value");
        request.setArraySize(20);
        log.info("sending SMS to " + request.getPhoneNos());

        /*
         * SendEngSMSResponse response = (SendEngSMSResponse)
         * getWebServiceTemplate().marshalSendAndReceive(
         * "https://cap.cityu.edu.hk/sms/cityusms.asmx", request, new
         * WebServiceMessageCallback() {
         * 
         */
        SendEngSMSResponse response = (SendEngSMSResponse) getWebServiceTemplate().marshalSendAndReceive(
                "http://localhost:5000/s",
                request, new WebServiceMessageCallback() {

                    private String username = "user";
                    private String password = "password";

                    @Override
                    public void doWithMessage(WebServiceMessage message) {
                        try {
                            SaajSoapMessage saajSoapMessage = (SaajSoapMessage) message;

                            SOAPMessage soapMessage = saajSoapMessage.getSaajMessage();

                            SOAPPart soapPart = soapMessage.getSOAPPart();

                            SOAPEnvelope soapEnvelope = soapPart.getEnvelope();

                            SOAPHeader soapHeader = soapEnvelope.getHeader();

                            /*
                             * Name headerElementName = soapEnvelope.createName(
                             * "Security",
                             * "wsse",
                             * "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"
                             * );
                             * SOAPHeaderElement soapHeaderElement =
                             * soapHeader.addHeaderElement(headerElementName);
                             * SOAPElement usernameTokenSOAPElement =
                             * soapHeaderElement.addChildElement("UsernameToken",
                             * "wsse");
                             * 
                             * SOAPElement userNameSOAPElement =
                             * usernameTokenSOAPElement.addChildElement("Username",
                             * "wsse");
                             * logger.info(this.username);
                             * userNameSOAPElement.addTextNode(this.username);
                             * 
                             * SOAPElement passwordSOAPElement =
                             * usernameTokenSOAPElement.addChildElement("Password",
                             * "wsse");
                             * 
                             * passwordSOAPElement.addTextNode(this.password);
                             */

                            soapMessage.saveChanges();
                            saajSoapMessage.setSoapAction("http://tempuri.org/SendEngSMS");

                        } catch (Exception e) {
                            throw new RuntimeException("TokenHeaderRequestCallback", e);
                        }
                    }
                });
        log.info("The result is " + response.getSendEngSMSResult());

        return response;
    }
}