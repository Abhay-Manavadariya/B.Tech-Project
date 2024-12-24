package com.example.Project.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddWorkerDetailsDto {
    private int pumpId;
    private String firstName;
    private String lastName;
    private String email;
    private String aadhaarCard;
    private int mobileNo;
    private String birthDate;
    private String address;
    private String joiningDate;
    private int salary;
    private String country;
    private String state;
    private String city;
}
