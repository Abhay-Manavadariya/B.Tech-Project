package com.example.Project.Backend.services;


import com.example.Project.Backend.model.User;
import org.springframework.http.ResponseEntity;



public interface UserServices {
    ResponseEntity<?> userSignUp(User user);


}
