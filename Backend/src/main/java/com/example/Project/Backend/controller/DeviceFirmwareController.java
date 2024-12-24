package com.example.Project.Backend.controller;

import com.example.Project.Backend.model.DeviceFirmware;
import com.example.Project.Backend.repository.DeviceFirmwareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class DeviceFirmwareController {

    @Autowired
    DeviceFirmwareRepository deviceFirmwareRepository;

    @PostMapping(value = "/api/addDevicecFirmwareDetails")
    private ResponseEntity<?> AddPumpDetails(@RequestBody DeviceFirmware deviceFirmware) {
        deviceFirmwareRepository.save(deviceFirmware);
        return new ResponseEntity<>("DeviceFirmware data Added Successfully.", HttpStatus.OK);
    }

    @GetMapping(value = "/api/getAllDeviceFirmware")
    private List<DeviceFirmware> getAllDeviceFirmware()
    {
        List<DeviceFirmware> data = deviceFirmwareRepository.findAll();
        return data;
    }
}
