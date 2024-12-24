package com.example.Project.Backend.servicesimplementation;

import com.example.Project.Backend.model.User;
import com.example.Project.Backend.repository.UserRepository;
import com.example.Project.Backend.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImplementation implements UserServices {
    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> userSignUp(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }
        userRepository.save(user);
        return new ResponseEntity<>("User registered successfully.", HttpStatus.CREATED);
    }
}
