package com.example.Project.Backend.controller;

import com.example.Project.Backend.dto.DeviceRawDataDto;
import com.example.Project.Backend.model.DeviceRawData;
import com.example.Project.Backend.services.DeviceRawDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class DeviceRawDataController {

    @Autowired
    DeviceRawDataService deviceRawDataService;

    @PostMapping("/api/getAllDeviceRawData")
    public List<DeviceRawData> getDeviceRawDataBetweenTwoDate(@RequestBody DeviceRawDataDto deviceRawDataDto) {
        String fromDate = deviceRawDataDto.getFromDate();
        String toDate = deviceRawDataDto.getToDate();
        return deviceRawDataService.getDeviceRawDataBetweenTwoDate(fromDate, toDate);
    }

}
