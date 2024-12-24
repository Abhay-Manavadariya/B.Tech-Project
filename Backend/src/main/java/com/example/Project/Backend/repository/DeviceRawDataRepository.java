package com.example.Project.Backend.repository;

import com.example.Project.Backend.model.DeviceRawData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRawDataRepository extends JpaRepository<DeviceRawData,Long> {
    @Query(nativeQuery = true, value = "select * from device_raw_data where device_raw_data.requested_date between (:fromDate) and (:toDate) order by device_raw_data.requested_date desc")
    List<DeviceRawData> getDeviceRawDataBetweenTwoDate(String fromDate, String toDate);
}
