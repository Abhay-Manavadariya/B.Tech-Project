package com.example.Project.Backend.repository;

import com.example.Project.Backend.model.PumpMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PumpMasterRepostiory extends JpaRepository<PumpMaster,Long> {

    @Query(nativeQuery = true, value = "Select * from pump_master")
    List<PumpMaster> getAllPumpName();

    PumpMaster findPumpMasterById(Integer pumpId);

    @Modifying
    @Query(nativeQuery = true , value = "update pump_master set current_rate=:rate,last_modify_in_rate=CURRENT_TIMESTAMP where id=:pumpId")
    void  updateRateQuery(String rate,int pumpId);
}
