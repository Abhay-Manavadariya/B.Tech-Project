package com.example.Project.Backend.servicesimplementation;

import com.example.Project.Backend.model.AddNewStockOfPetrol;
import com.example.Project.Backend.repository.AddNewStockRepository;
import com.example.Project.Backend.services.AddNewStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AddNewStockServiceImpl implements AddNewStockService {
    @Autowired
    AddNewStockRepository addNewStockRepository;

    @Override
    @Transactional
    public void addNewStock(AddNewStockOfPetrol addNewStockOfPetrol) {
        Integer pumpId = addNewStockOfPetrol.getPumpId();
        int getOldStockOfPetrol = addNewStockRepository.getOldStockOfPetrol(pumpId);
        addNewStockOfPetrol.setOldStockOfPetrolLitre(getOldStockOfPetrol);
        int newAddPetrolStock = addNewStockOfPetrol.getAddNewStockOfPetrolLitre();
        int newCurrentStockOfPetrol = getOldStockOfPetrol + newAddPetrolStock;
        addNewStockOfPetrol.setNewCurrentStockOfPetrolLitre(newCurrentStockOfPetrol);
        addNewStockRepository.setCurrentStaticReading(newCurrentStockOfPetrol,pumpId);
        addNewStockRepository.save(addNewStockOfPetrol);
    }
}
