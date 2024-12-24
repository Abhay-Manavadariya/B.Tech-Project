package com.example.Project.Backend.services;

import com.example.Project.Backend.dto.AddWorkerDetailsDto;
import com.example.Project.Backend.model.AddWorkerDetails;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AddWorkerDetailsService {
    ResponseEntity<?> saveWorkerDetails(AddWorkerDetails addWorkerDetails);

}
