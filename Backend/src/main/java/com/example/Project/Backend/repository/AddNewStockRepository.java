package com.example.Project.Backend.repository;

import com.example.Project.Backend.model.AddNewStockOfPetrol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddNewStockRepository extends JpaRepository<AddNewStockOfPetrol,Long> {

    @Query(nativeQuery = true, value = "select current_static_reading from pump_master where id=:pumpId")
    int getOldStockOfPetrol(Integer pumpId);

    @Modifying
    @Query(nativeQuery = true,value = "update pump_master set current_static_reading=:newCurrentStockOfPetrol,last_modify_on_petrol_pump=CURRENT_TIMESTAMP where id=:pumpId")
    void setCurrentStaticReading(int newCurrentStockOfPetrol,Integer pumpId);

    @Query(nativeQuery = true, value = "select * from add_petrol_new_stock where pump_id=:pumpId ORDER BY created_on asc")
    List<AddNewStockOfPetrol> getTankFillingData(Integer pumpId);

    @Query(nativeQuery = true, value = "select * from add_petrol_new_stock where pump_id=:pumpId ORDER BY created_on desc")
    List<AddNewStockOfPetrol> getTankFillingDataInDesc(Integer pumpId);

}
