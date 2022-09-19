package com.example.sms;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.consumingwebservice.wsdl.SendEngSMSResponse;

@RestController
public class SMSController {
    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/send")
    public String testSms(@RequestBody String request){
        Jaxb2Marshaller marshaller = SmsConfiguration.marshaller();
        SmsClient client = SmsConfiguration.SmsClient(marshaller);
        SendEngSMSResponse response = client.sendSms();
        return response.getSendEngSMSResult();
    }
}
