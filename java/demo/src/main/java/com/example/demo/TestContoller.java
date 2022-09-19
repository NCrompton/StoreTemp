package com.example.demo;

import org.springframework.boot.jackson.JsonComponent;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class TestContoller {
    @GetMapping("/")
    public String index(){
        Application application = new Application();
        String[] text = application.getContent();
        return text.toString();
    }

    @GetMapping("/test/{Id}")
    public String test(@PathVariable String Id, @RequestBody Some request){
        Application application = new Application();
        request.setAddUp(Id);
        System.out.println(request.toString());
        return Id;
    }

    @PostMapping("/test/{Id}")
    public String testPost(ModelMap model, @PathVariable String Id, @RequestParam String name){
        System.out.println(name);
        
        
        model.put("name", name);
        model.put("id", Id);

        return "Welcome";
    }
}

class Some{
    
    @lombok.Getter
    @lombok.Setter
    private String name; 
    
    @lombok.Getter
    @lombok.Setter
    private int id;
    
    @lombok.Getter
    @lombok.Setter
    private String addUp;

    public Some(String name, int id){
        this.name = name;
        this.id = id;
    }

    public String toString(){
        String s = String.format("%s, %d (%s)", name, id, addUp);
        return s;
    }
}
