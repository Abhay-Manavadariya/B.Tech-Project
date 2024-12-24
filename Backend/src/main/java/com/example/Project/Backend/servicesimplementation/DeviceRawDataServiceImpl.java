package com.example.Project.Backend.servicesimplementation;

import com.example.Project.Backend.model.DeviceRawData;
import com.example.Project.Backend.repository.DeviceRawDataRepository;
import com.example.Project.Backend.services.DeviceRawDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceRawDataServiceImpl implements DeviceRawDataService {

    @Autowired
    DeviceRawDataRepository deviceRawDataRepository;

    @Override
    public List<DeviceRawData> getDeviceRawDataBetweenTwoDate(String fromDate, String toDate) {

        List<DeviceRawData> Data = deviceRawDataRepository.getDeviceRawDataBetweenTwoDate(fromDate, toDate);

        if (Data.isEmpty()) {
            System.out.println("List is Empty!!!!!");
        }
        return Data;
    }
}
