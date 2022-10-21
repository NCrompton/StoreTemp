package com.example.sms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;

public class SmsConfiguration {

  @Bean
  public static Jaxb2Marshaller marshaller() {
    Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
    // this package must match the package in the <generatePackage> specified in
    // pom.xml
    marshaller.setContextPath("com.example.consumingwebservice.wsdl");
    return marshaller;
  }

  @Bean
  public static SmsClient SmsClient(Jaxb2Marshaller marshaller) {
    SmsClient client = new SmsClient();
    client.setDefaultUri("https://cap.cityu.edu.hk/sms/cityusms.asmx");
    client.setMarshaller(marshaller);
    client.setUnmarshaller(marshaller);
    return client;
  }

  @Bean
  public static SmsClientChi SmsClientChi(Jaxb2Marshaller marshaller) {
    SmsClientChi client = new SmsClientChi();
    client.setDefaultUri("https://cap.cityu.edu.hk/sms/cityusms.asmx");
    client.setMarshaller(marshaller);
    client.setUnmarshaller(marshaller);
    return client;
  }
}
