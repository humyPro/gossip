package com.gossip.login.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @Author humy
 * @Date 2018/8/2 - 15:57
 */
@Controller
public class Person {
    @GetMapping("person")
    public String person(){
        return "person";
    }
}
