package com.example.sms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmsApplication implements CommandLineRunner {

	@Autowired
	Properties prop;

	public static void main(String[] args) {
		SpringApplication.run(SmsApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("caller api is " + prop.getCallerApi());
	}

}
