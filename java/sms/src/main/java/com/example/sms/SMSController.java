package com.example.sms;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;

import com.example.consumingwebservice.wsdl.SendEngSMSResponse;
import com.example.consumingwebservice.wsdl.SendChiSMSResponse;

@RestController
public class SMSController {

    @Value("${callerApi}")
    String callerApi;

    @Value("${isTest}")
    boolean isTest;

    @Autowired
    Properties prop;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping(value = "/send/{content}/{phoneNosParam}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map SendSms(@RequestBody String request, @PathVariable String content,
            @PathVariable String phoneNosParam) {

        Jaxb2Marshaller marshaller = SmsConfiguration.marshaller();
        String[] phoneNos = phoneNosParam.split(" ");
        SmsClient client = SmsConfiguration.SmsClient(marshaller);

        SendEngSMSResponse response = client.sendSms(content, callerApi, phoneNos, isTest);
        Map res = Collections.singletonMap("SMS-ID", response.getSendEngSMSResult());
        return res;
    }

    @GetMapping(value = "/send/chinese/{content}/{phoneNosParam}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map SendSmsChi(@RequestBody String request, @PathVariable String content,
            @PathVariable String phoneNosParam) {

        Jaxb2Marshaller marshaller = SmsConfiguration.marshaller();
        String[] phoneNos = phoneNosParam.split(" ");
        SmsClientChi client = SmsConfiguration.SmsClientChi(marshaller);

        SendChiSMSResponse response = client.sendSms(content, callerApi, phoneNos, isTest);
        Map res = Collections.singletonMap("SMS-ID", response.getSendChiSMSResult());
        return res;
    }
}
