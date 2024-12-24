package com.example.Project.Backend.controller;

import com.example.Project.Backend.dto.AddWorkerDetailsDto;
import com.example.Project.Backend.dto.CommonDto;
import com.example.Project.Backend.model.AddWorkerDetails;
import com.example.Project.Backend.repository.AddNewStockRepository;
import com.example.Project.Backend.repository.AddWorkerDetailsRepository;
import com.example.Project.Backend.services.AddWorkerDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class AddWorkerDetailsController {

    @Autowired
    AddWorkerDetailsService addWorkerDetailsService;

    @Autowired
    AddWorkerDetailsRepository addWorkerDetailsRepository;

    @PostMapping(value = "/api/AddWorkerDetails")
    private ResponseEntity<?> AddWorkerDetails(@RequestBody AddWorkerDetails addWorkerDetails) {
        return addWorkerDetailsService.saveWorkerDetails(addWorkerDetails);
    }

    @PostMapping(value = "/api/getAllWorkerDetails")
    private List<AddWorkerDetails> getAllByWorkerDetails(@RequestBody CommonDto commonDto)
    {
        return addWorkerDetailsRepository.getAllByWorkerDetails(commonDto.getPumpId());
    }
}
