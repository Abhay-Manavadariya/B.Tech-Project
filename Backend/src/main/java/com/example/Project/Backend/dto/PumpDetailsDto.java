package com.example.Project.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PumpDetailsDto {
    private String pumpName;
    private Integer totalNozzle;
    private Integer fuelCurrentStock;
    private Date lastUpdateOnPump;
    private boolean dispensingStatus;
    private String currentPetrolRate;
    private Date lastModifiedInRate;
}
