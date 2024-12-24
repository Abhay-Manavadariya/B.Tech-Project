package com.example.Project.Backend.repository;

import com.example.Project.Backend.model.DeviceFirmware;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceFirmwareRepository extends JpaRepository<DeviceFirmware,Long> {
}
