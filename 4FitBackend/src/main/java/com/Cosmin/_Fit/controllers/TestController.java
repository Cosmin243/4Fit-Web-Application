package com.Cosmin._Fit.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/user/hello")
    public String helloUser(){
        return "Salut utilizatorule. Ai acces la resursele de baza ale salii";
    }

    @GetMapping("/manager/hello")
    public String helloManager(){
        return "Salut managerule. Ai acess la toate resursele salii";
    }

    @GetMapping("/administrator/hello")
    public String helloAdministrator(){
        return "Salut administratorule. Ai acces la resuresele salii si la controlul asupra abonatilor";
    }
}
