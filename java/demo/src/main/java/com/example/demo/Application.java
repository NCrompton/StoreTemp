package com.example.demo;

import java.lang.reflect.Array;
import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {
    public static void main(String[] args){
        SpringApplication.run(Application.class, args);
    }
    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx){
        return args -> {
            System.out.println("Inspect the Bean");
            String[] beanNames = ctx.getBeanDefinitionNames();
            Arrays.sort(beanNames);
            for(String beanName: beanNames){
                System.out.println(beanName);
            }
        };
    }

    public String[] getContent() {
        String[] texts = {"pomeranczowy", "bialy", "czare", "niebiesky", "fioletowy"};
        return texts;
    }
}
