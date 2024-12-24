package com.example.Project.Backend.controller;


import com.example.Project.Backend.model.User;
import com.example.Project.Backend.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
class UserController {

    @Autowired
    private UserServices userService;

    @GetMapping("/sample")
    public String getAllUser() {
        return "helllo!!!";
    }


    @PostMapping(value = "/api/signup")
    private ResponseEntity<?> signup(@RequestBody User user) {
        return userService.userSignUp(user);
    }
}

