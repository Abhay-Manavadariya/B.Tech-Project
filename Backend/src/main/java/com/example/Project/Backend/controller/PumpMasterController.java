package com.example.Project.Backend.controller;

import com.example.Project.Backend.dto.CommonDto;
import com.example.Project.Backend.dto.PumpDetailsDto;
import com.example.Project.Backend.dto.RateChangeDto;
import com.example.Project.Backend.model.AddNewStockOfPetrol;
import com.example.Project.Backend.model.PumpMaster;
import com.example.Project.Backend.repository.AddNewStockRepository;
import com.example.Project.Backend.repository.PumpMasterRepostiory;
import com.example.Project.Backend.services.AddNewStockService;
import com.example.Project.Backend.services.PumpMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PumpMasterController {

    @Autowired
    PumpMasterService pumpMasterService;

    @Autowired
    PumpMasterRepostiory pumpMasterRepostiory;

    @Autowired
    AddNewStockRepository addNewStockRepository;

    @Autowired
    AddNewStockService addNewStockService;

    @PostMapping(value = "/api/addPumpDetails")
    private ResponseEntity<?> AddPumpDetails(@RequestBody PumpMaster pumpMaster) {
        pumpMasterService.addPumpDetails(pumpMaster);
        return new ResponseEntity<>("Pump Details Added Successfully.",HttpStatus.OK);
    }

    @GetMapping(value = "/api/getAllPumpName")
    private List<PumpMaster> getAllPumpName()
    {
        return pumpMasterRepostiory.getAllPumpName();
    }

    @PostMapping(value = "/api/AddNewStock")
    private ResponseEntity<?> addNewStock(@RequestBody AddNewStockOfPetrol addNewStockOfPetrol)
    {
        addNewStockService.addNewStock(addNewStockOfPetrol);
        return new ResponseEntity<>("New Stock of petrol Added Successfully.",HttpStatus.OK);
    }

    @GetMapping(value = "/api/getAllAddNewStockList")
    private List<AddNewStockOfPetrol> getAllAddNewStockList()
    {
        return addNewStockRepository.findAll();
    }

    @PostMapping(value = "/api/getTankFillingData")
    private List<AddNewStockOfPetrol> getTankFillingData(@RequestBody CommonDto commonDto)
    {
        return addNewStockRepository.getTankFillingData(commonDto.getPumpId());
    }

    @PostMapping(value = "/api/getPumpDetails")
    private PumpDetailsDto getPumpDetails(@RequestBody CommonDto commonDto)
    {
        return pumpMasterService.getPumpDetails(commonDto.getPumpId());
    }

    @PostMapping(value = "/api/rateChange")
    private void rateChange(@RequestBody RateChangeDto rateChangeDto)
    {
        pumpMasterService.updateRate(rateChangeDto);
    }
}
