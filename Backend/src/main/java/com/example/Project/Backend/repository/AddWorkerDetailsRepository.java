package com.example.Project.Backend.repository;

import com.example.Project.Backend.dto.AddWorkerDetailsDto;
import com.example.Project.Backend.model.AddWorkerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddWorkerDetailsRepository extends JpaRepository<AddWorkerDetails,Long> {
    @Query(nativeQuery = true, value = "select * from add_worker_details where pump_id=:pumpId ORDER BY created_on asc")
    List<AddWorkerDetails> getAllByWorkerDetails(Integer pumpId);

}
