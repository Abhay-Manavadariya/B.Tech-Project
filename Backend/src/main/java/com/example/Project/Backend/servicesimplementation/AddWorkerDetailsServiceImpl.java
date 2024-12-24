package com.example.Project.Backend.servicesimplementation;

import com.example.Project.Backend.dto.AddWorkerDetailsDto;
import com.example.Project.Backend.model.AddWorkerDetails;
import com.example.Project.Backend.repository.AddWorkerDetailsRepository;
import com.example.Project.Backend.services.AddWorkerDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddWorkerDetailsServiceImpl implements AddWorkerDetailsService {

    @Autowired
    private AddWorkerDetailsRepository addWorkerDetailsRepository;

    @Override
    public ResponseEntity<?> saveWorkerDetails(AddWorkerDetails addWorkerDetails) {
        addWorkerDetailsRepository.save(addWorkerDetails);
        return new ResponseEntity<>("User registered successfully.", HttpStatus.CREATED);
    }
}
