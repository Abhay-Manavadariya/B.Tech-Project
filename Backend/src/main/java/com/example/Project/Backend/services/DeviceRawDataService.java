package com.example.Project.Backend.services;

import com.example.Project.Backend.model.DeviceRawData;

import java.util.List;

public interface DeviceRawDataService {
    List<DeviceRawData> getDeviceRawDataBetweenTwoDate(String fromDate, String toDate);
}
