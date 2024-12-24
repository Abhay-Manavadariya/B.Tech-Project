package com.example.Project.Backend.services;


import com.example.Project.Backend.dto.PumpDetailsDto;
import com.example.Project.Backend.dto.RateChangeDto;
import com.example.Project.Backend.model.PumpMaster;


public interface PumpMasterService {
    void addPumpDetails(PumpMaster pumpMaster);

    PumpDetailsDto getPumpDetails(Integer PumpId);

    void updateRate(RateChangeDto rateChangeDto);
}
