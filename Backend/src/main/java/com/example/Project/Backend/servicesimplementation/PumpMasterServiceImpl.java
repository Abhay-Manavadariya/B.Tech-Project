package com.example.Project.Backend.servicesimplementation;

import com.example.Project.Backend.dto.PumpDetailsDto;
import com.example.Project.Backend.dto.RateChangeDto;
import com.example.Project.Backend.model.AddNewStockOfPetrol;
import com.example.Project.Backend.model.PumpMaster;
import com.example.Project.Backend.repository.AddNewStockRepository;
import com.example.Project.Backend.repository.PumpMasterRepostiory;
import com.example.Project.Backend.services.PumpMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class PumpMasterServiceImpl implements PumpMasterService {

    @Autowired
    PumpMasterRepostiory pumpMasterRepostiory;

    @Autowired
    AddNewStockRepository addNewStockRepository;

    @Override
    public void addPumpDetails(PumpMaster pumpMaster) {
        pumpMasterRepostiory.save(pumpMaster);
    }

    @Override
    public PumpDetailsDto getPumpDetails(Integer pumpId) {
        PumpMaster pumpDetails = pumpMasterRepostiory.findPumpMasterById(pumpId);
        PumpDetailsDto pumpDetailsDto = new PumpDetailsDto();
        pumpDetailsDto.setPumpName(pumpDetails.getPumpName());
        pumpDetailsDto.setFuelCurrentStock(pumpDetails.getCurrentStaticReading());
        pumpDetailsDto.setTotalNozzle(pumpDetails.getNoOfNozzle());
        pumpDetailsDto.setDispensingStatus(pumpDetails.getDispensingStatus());
        pumpDetailsDto.setCurrentPetrolRate(pumpDetails.getCurrentRate());

        List<AddNewStockOfPetrol> addNewStockOfPetrolList = addNewStockRepository.getTankFillingDataInDesc(pumpId);
        AddNewStockOfPetrol firstRecord = addNewStockOfPetrolList.get(0);

        pumpDetailsDto.setLastUpdateOnPump(Date.from(firstRecord.getCreatedOn()));
        pumpDetailsDto.setLastModifiedInRate(pumpDetails.getLastModifiedInRate());

        return pumpDetailsDto;
    }

    @Override
    @Transactional
    public void updateRate(RateChangeDto rateChangeDto) {
        pumpMasterRepostiory.updateRateQuery(rateChangeDto.getCurrentRate(),rateChangeDto.getPumpId());
    }

}
