package com.example.sms;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.beans.factory.annotation.Autowired;

/* @SpringBootConfiguration
@PropertySource("classpath:application.properties")
@Configuration */
@Component
@ConfigurationProperties
public class Properties {

    @Autowired
    public Environment env;

    /* @Value("${callerApi}") */
    String callerApi;

    /*
     * public static class SMSProperties {
     * String callerApi;
     * }
     */

    public String getCallerApi() {
        return callerApi;
    }

    public String setCallerApi(String callerApi) {
        return this.callerApi = callerApi;
    }
}